
## Purpose
This is a project for showing temperature capctured from a Tellstick sensor

I am using the following in my setup:
- 1 Telldus Tellstick Znet Lite v2
- 1 Indoor/Outdoor Telldus 433,92 MHz sensor

Using node and express with Chart.js for showing the data

## Configuration needed after code is downloaded
1. Connect your sensor to your Tellstick in Telldus Live.

2. Then create directory called: 

    config

With 1 file called common.json:

    {
    	"authkey": "INSERT_YOUR_TOKEN_HERE",
	    "port": 8081,
	    "Publickey" :	"TELLEDUS Public key",
	    "PrivateKey":	"TELLEDUS Private key",
	    "Token":	"TELLEDUS Token",
	    "TokenSecret":	"TELLEDUS Token secret",
	    "outdoor":"NAME ON THE OUTDOOR SENSOR THAT WILL BE DISPLAYED IN THE GRAPH",
        "reloadverdi": 300000
    }


AUTHKEY is the local token key you can get from your local Tellstick (use your local IP):
https://tellstick-server.readthedocs.io/en/latest/api/authentication.html#step-1-request-a-request-token

This is how you do it:
======================
1. Run:
 curl -i -d app="Example app" -X PUT http://192.168.1.2/api/token

2. Use the URL in the JSON-response to authorize at telldus live with your telldus user.

REMARK! Not all browswers accept this. On i.e. Chrome you might get an error saying '/tellduslive/authorize' was not found with a python stacktrace.
If so, use another browser

3. When you have been authorized, use the following command to get the local token:
 curl -i -X GET http://192.168.1.2/api/token?token=0996b21ee3f74d2b99568d8207a8add9
(Replace the token with the one from the previous answer)

4. Then, use the token you get and put it into the token variable in the config/common.json

(When approaching expiry) 
5. If you want to renew the token (and accepted that in the call above), use the following call to get a new token:
 curl -i -X GET http://192.168.1.2/api/refreshToken -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6IkV4YW1wbGUgYXBwIiwiZXhwIjoxNDUyOTUxNTYyfQ.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.HeqoFM6-K5IuQa08Zr9HM9V2TKGRI9VxXlgdsutP7sg"
(replace with correct IP and token)



The other key ant token values are generated here:
https://api.telldus.com/keys/index


## How to start?
Check out this code.
Create common.json in a config-folder, according to above.

Run the following command once to download modules:
__npm install__

Run one of the following command to start application/server:
__node server.js__
 or 
__npm start__

## How to stop?
If started in background, find the process by command
netstat -nlp|grep 8082
then
kill PID -9 -f

## Known limitations/bugs


## Additional information about Charts.js
https://www.chartjs.org/docs/latest/axes/styling.html

### Tellstick documentation
https://api.telldus.com/

### Device types
| Name (type)       | UUID                                  |
|-------------------|---------------------------------------|
| Unknown/other     | 00000000-0001-1000-2005-ACCA54000000  |
| Alarm Sensor	     | 00000001-0001-1000-2005-ACCA54000000  |
| Container	        | 00000002-0001-1000-2005-ACCA54000000  |
| Controller	       | 00000003-0001-1000-2005-ACCA54000000|
| Door/Window	      | 00000004-0001-1000-2005-ACCA54000000  |
| Light             | 	00000005-0001-1000-2005-ACCA54000000 |
| Lock	             | 00000006-0001-1000-2005-ACCA54000000  |
| Media	            | 00000007-0001-1000-2005-ACCA54000000  |
| Meter	            | 00000008-0001-1000-2005-ACCA54000000  |
| Motion	           | 00000009-0001-1000-2005-ACCA54000000  |
| On/Off sensor	    | 0000000A-0001-1000-2005-ACCA54000000  |
| Person	           | 0000000B-0001-1000-2005-ACCA54000000  |
| Remote control	   | 0000000C-0001-1000-2005-ACCA54000000  |
| Sensor	           | 0000000D-0001-1000-2005-ACCA54000000  |
| Smoke sensor	     | 0000000E-0001-1000-2005-ACCA54000000  |
| Speaker	          | 0000000F-0001-1000-2005-ACCA54000000  |
| Switch/Outlet	    | 00000010-0001-1000-2005-ACCA54000000  |
| Thermostat	       | 00000011-0001-1000-2005-ACCA54000000  |
| Virtual	          | 00000012-0001-1000-2005-ACCA54000000  |
| Window covering	  | 00000013-0001-1000-2005-ACCA54000000  |
| Projector screen	 | 00000014-0001-1000-2005-ACCA5400000   |
