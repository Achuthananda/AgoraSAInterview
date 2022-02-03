### Agora SA Interview 
- Starts a Live Video Chat room with the Messaging Capability
- Users can Join and Leave the Channel "acmptestchannel" 
- Users can Mute & UnMute Audio. 
- Users can Enable Video and Disable Video.
- Users can Send Messages to the Channel.

### How to get Authenticated ?
You can create a userid and corresponding RTM Token by calling the following API. RtmToken header contains the Token you can use to enter the Token.
```
curl -IXGET http://rtm.achuth.tech/rtmtoken?userid=abc | grep RtmToken
HTTP/1.1 200 OK
Date: Thu, 03 Feb 2022 07:29:13 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Length: 5
RtmToken: 00625bec3a401354e54b024909003asdsadas461asse8dIAA2MMrs83g7VWhQLfUG3eAKQnXtTn64M1ASyU78VUIS2sJBJDUAAAAAEACHSecBydX8YQEA6APJ1fxh
Vary: Accept-Encoding
Content-Type: text/html; charset=utf-8
```

### Fixed Parameters
For the Assignment Purpose, Following parameters are fixed. RTC Token is hardcoded . You can use the userid and token generated from the previous section.
```
appId = 25bec3a401354e54b024909003461e8d
channelId = acmptestchannel
user = abc
Token = 00625bec3a401354e54b024909003asdsadas461asse8dIAA2MMrs83g7VWhQLfUG3eAKQnXtTn64M1ASyU78VUIS2sJBJDUAAAAAEACHSecBydX8YQEA6APJ1fxh
```




