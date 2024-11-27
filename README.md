
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

eks:
 curl -i -d app="Example app" -X PUT http://192.168.1.2/api/token

Use the response of this call to log into telldus live with your telldus user to authorize.
Remark that not all browsers accept this. In Chrome and Firefox(?) you will get a messag saying /tellduslive/authorize' was not found
(with a python-stacktrace)

When you have been authorized, use the token from above to get the token from your local Telldus:
i.e.:
 curl -i -X GET http://192.168.1.2/api/token?token=0996b21ee3f74d2b99568d8207a8add9
(Substitute with correct token)

The response will give you the token to use. Put this token in the common.json in the config folder.

If you allowed to renew the token, you can use this call to renew the token (replace with the local telldus token):
 curl -i -X GET http://0.0.0.0/api/refreshToken -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6IkV4YW1wbGUgYXBwIiwiZXhwIjoxNDUyOTUxNTYyfQ.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.HeqoFM6-K5IuQa08Zr9HM9V2TKGRI9VxXlgdsutP7sg"

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
