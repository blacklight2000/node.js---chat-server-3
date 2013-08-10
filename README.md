node.js---chat-server-3
=======================

usernames added and private chatting added but no multiroom - relatively simple node.js server. 

Source: http://www.youtube.com/watch?v=k8o8-Q_-Qfk

meworks consumed: node.js, socket.io, http, express

Refer to https://github.com/heroku/node-js-sample for various useful references


Notes on the code:

(1) To whisper to say Emily: type "/w Emily my little brother is a pest"

(2) the .whisper's class css specs don't work so I patched by using HTML5's <i> tag so that all whispering text shows up in italics. 

(3) I patched the code so that you get a message "Please enter a user from the list of valid users" if you whisper to a non-existent user with no message e.g non-existent user Noname with no message "/w NoName" 

(4) I could have refactored the code but all I cared about was to get it working - I have suffered enough :)

