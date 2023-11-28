
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
curl -i -d app="Example app" -X PUT http://192.168.1.253/api/token

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
