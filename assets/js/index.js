// create Agora rtclient
var isLoggedIn = false;
$("#sendMsgBtn").prop("disabled", true);

// Auto Init MaterializeCSS
/*M.AutoInit();*/

var rtclient = AgoraRTC.createClient({
  mode: "live",
  codec: "vp8"
});
var localTracks = {
  videoTrack: null,
  audioTrack: null
};
var localTrackState = {
  videoTrackEnabled: true,
  audioTrackEnabled: true
};
var remoteUsers = {};
// Agora rtclient options
var options = {
  appid: null,
  rtc_channel: null,
  uid: null,
  token: null,
  name: null,
  role: "host" // host or audience
};

$("#host-join").click(function (e) {
  options.role = "host";
});

$("#audience-join").click(function (e) {
  options.role = "audience";
});

$("#join-form").submit(async function (e) {
  e.preventDefault();
  $("#host-join").attr("disabled", true);
  $("#audience-join").attr("disabled", true);
  try {
    options.appid = $("#appid").val();
    options.rtc_channel = $("#channel").val();
    options.name = $("#username").val();
    await join();
  } catch (error) {
    console.error(error);
  } finally {
    $("#leave").attr("disabled", false);
  }
});

$("#leave").click(function (e) {
  leave();
});

async function join() {
  // create Agora rtclient
  rtclient.setClientRole(options.role);
  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  if (options.role === "audience") {
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    // add event listener to play remote tracks when remote user publishs.
    rtclient.on("user-published", handleUserPublished);
    rtclient.on("user-joined", handleUserJoined);
    rtclient.on("user-left", handleUserLeft);
  }
  // join the rtc_channel
  let tokenid1 =
    "00625bec3a401354e54b024909003461e8dIACJ4UK8OUltbgRHjpaJdIU8jAYxwRqsiEnMPamnAmZrcszTqxYAAAAAEADbqsx0CQwCYgEAAQAJDAJi";

  options.uid = await rtclient.join(
    options.appid,
    options.rtc_channel,
    tokenid1
  );
  if (options.role === "host") {
    $("#mic-btn").prop("disabled", false);
    $("#video-btn").prop("disabled", false);
    rtclient.on("user-published", handleUserPublished);
    rtclient.on("user-joined", handleUserJoined);
    rtclient.on("user-left", handleUserLeft);
    // create local audio and video tracks
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    showMuteButton();
    // play local video track
    localTracks.videoTrack.play("local-player");
    $("#local-player-name").text(`(${options.name})`);
    // publish local tracks to rtc_channel
    await rtclient.publish(Object.values(localTracks));
    console.log("Successfully published.");
  }
  /*RTC Channel Creation*/
  var accountName = $("#username").val();
  var agoraAppId = $("#appid").val();
  var tokenId = $("#tokenId").val();

  rtcclient = AgoraRTM.createInstance(agoraAppId, {
    enableLogUpload: false
  });

  // Login
  rtcclient
    .login({
      token: tokenId,
      uid: accountName
    })
    .then(() => {
      console.log("AgoraRTM client login success. Username: " + accountName);
      isLoggedIn = true;

      // Channel Join
      var channelName = $("#channel").val();
      channel = rtcclient.createChannel(channelName);
      document.getElementById("channelNameBox").innerHTML = channelName;
      channel
        .join()
        .then(() => {
          console.log("AgoraRTM client channel join success.");
          $("#joinChannelBtn").prop("disabled", true);
          $("#sendMsgBtn").prop("disabled", false);

          // Close Channel Join Modal
          $("#joinChannelModal").modal("close");

          // Send Channel Message
          $("#sendMsgBtn").click(function () {
            singleMessage = $("#channelMsg").val();
            channel
              .sendMessage({
                text: singleMessage
              })
              .then(() => {
                console.log("Message sent successfully.");
                console.log(
                  "Your message was: " + singleMessage + " by " + accountName
                );
                $("#messageBox").append(
                  "<br> <b>Sender:</b> " +
                    accountName +
                    "<br> <b>Message: </b> <span style='white-space: pre-wrap;'>" +
                    singleMessage +
                    "</span><br>"
                );
                $("#channelMsg").val("");
              })
              .catch((error) => {
                console.log("Message wasn't sent due to an error: ", error);
              });

            // Receive Channel Message
            channel.on("ChannelMessage", ({ text }, senderId) => {
              console.log("Message received successfully.");
              console.log("The message is: " + text + " by " + senderId);
              $("#messageBox").append(
                "<br> <b>Sender:</b> " +
                  senderId +
                  "<br> <b>Message: </b> <span style='white-space: pre-wrap;'>" +
                  text +
                  "</span><br>"
              );
            });
          });
        })
        .catch((error) => {
          console.log("AgoraRTM client channel join failed: ", error);
        })
        .catch((err) => {
          console.log("AgoraRTM client login failure: ", err);
        });
    });
}

async function leave() {
  for (trackName in localTracks) {
    var track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      $("#mic-btn").prop("disabled", true);
      $("#video-btn").prop("disabled", true);
      localTracks[trackName] = undefined;
    }
  }
  // remove remote users and player views
  remoteUsers = {};
  $("#remote-playerlist").html("");
  // leave the rtc_channel
  await rtclient.leave();
  $("#local-player-name").text("");
  $("#host-join").attr("disabled", false);
  $("#audience-join").attr("disabled", false);
  $("#leave").attr("disabled", true);
  hideMuteButton();
  console.log("Client successfully left rtc_channel.");

  channel.leave();
  rtcclient.logout();
  isLoggedIn = false;
  $("#joinChannelBtn").prop("disabled", false);
  $("#sendMsgBtn").prop("disabled", true);
}

async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await rtclient.subscribe(user, mediaType);
  console.log("achuth:Successfully subscribed to user");
  if (mediaType === "video") {
    const player = $(`
      <div id="player-wrapper-${uid}" class="col-sm">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
    $("#remote-playerlist").append(player);
    user.videoTrack.play(`player-${uid}`);
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
}

// Handle user published
function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

// Handle user joined
function handleUserJoined(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

// Handle user left
function handleUserLeft(user) {
  const id = user.uid;
  delete remoteUsers[id];
  $(`#player-wrapper-${id}`).remove();
}

// Mute audio click
$("#mic-btn").click(function (e) {
  if (localTrackState.audioTrackEnabled) {
    muteAudio();
  } else {
    unmuteAudio();
  }
});

// Mute video click
$("#video-btn").click(function (e) {
  if (localTrackState.videoTrackEnabled) {
    muteVideo();
  } else {
    unmuteVideo();
  }
});

// Hide mute buttons
function hideMuteButton() {
  $("#video-btn").css("display", "none");
  $("#mic-btn").css("display", "none");
}

// Show mute buttons
function showMuteButton() {
  $("#video-btn").css("display", "inline-block");
  $("#mic-btn").css("display", "inline-block");
}

// Mute audio function
async function muteAudio() {
  if (!localTracks.audioTrack) return;
  await localTracks.audioTrack.setEnabled(false);
  localTrackState.audioTrackEnabled = false;
  $("#mic-btn").text("Unmute Audio");
}

// Mute video function
async function muteVideo() {
  if (!localTracks.videoTrack) return;
  await localTracks.videoTrack.setEnabled(false);
  localTrackState.videoTrackEnabled = false;
  $("#video-btn").text("Unmute Video");
}

// Unmute audio function
async function unmuteAudio() {
  if (!localTracks.audioTrack) return;
  await localTracks.audioTrack.setEnabled(true);
  localTrackState.audioTrackEnabled = true;
  $("#mic-btn").text("Mute Audio");
}

// Unmute video function
async function unmuteVideo() {
  if (!localTracks.videoTrack) return;
  await localTracks.videoTrack.setEnabled(true);
  localTrackState.videoTrackEnabled = true;
  $("#video-btn").text("Mute Video");
}
