### Agora SA Interview 
- Starts a Live Video Chat room with the Messaging Capability
- Users can Join and Leave the Channel "acmptestchannel" 
- Users can Mute & UnMute Audio. 
- Users can Enable Video and Disable Video.
- Users can Send Messages to the Channel.


#### Link for [demo](https://p0irt.csb.app/) 

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



### Screenshots
![alt text](https://github.com/Achuthananda/AgoraSAInterview/blob/master/assets/img/ss.jpg)
![alt text](https://github.com/Achuthananda/AgoraSAInterview/blob/master/assets/img/ss1.jpg)

```bash



 _____ _                 _     __   __            
|_   _| |               | |    \ \ / /            
  | | | |__   __ _ _ __ | | __  \ V /___  _   _   
  | | | '_ \ / _` | '_ \| |/ /   \ // _ \| | | |  
  | | | | | | (_| | | | |   <    | | (_) | |_| |  
  \_/ |_| |_|\__,_|_| |_|_|\_\   \_/\___/ \__,_|  
                                                  
                                                  
______                                            
|  ___|                                           
| |_ ___  _ __                                    
|  _/ _ \| '__|                                   
| || (_) | |                                      
\_| \___/|_|                                      
                                                  
                                                  
______      _               _   _               _ 
| ___ \    (_)             | | | |             | |
| |_/ / ___ _ _ __   __ _  | |_| | ___ _ __ ___| |
| ___ \/ _ \ | '_ \ / _` | |  _  |/ _ \ '__/ _ \ |
| |_/ /  __/ | | | | (_| | | | | |  __/ | |  __/_|
\____/ \___|_|_| |_|\__, | \_| |_/\___|_|  \___(_)
                     __/ |                        
                    |___/                         

 
```

