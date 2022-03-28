
## Purpose
This is a project for showing temperature capctured from a Tellstick sensor

Using Chart.js for showing the data

## Configuration needed after code is downloaded

Need to create directory called: 

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
npm install

Run one of the following command to start application/server:
node server.js or npm start

## Known limitations/bugs
