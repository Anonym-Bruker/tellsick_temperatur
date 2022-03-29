
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
	"port": 8081
    }

AUTHKEY is the local token key you can get from your local Tellstick (use your local IP):
https://tellstick-server.readthedocs.io/en/latest/api/authentication.html#step-1-request-a-request-token


## How to start?
Check out this code.
Create common.json in a config-folder, according to above.

Run the following command once to download modules:
__npm install__

Run one of the following command to start application/server:
__node server.js__
 or 
__npm start__

## Known limitations/bugs


## Additional information about Charts.js
https://www.chartjs.org/docs/latest/axes/styling.html
