var express = require('express');
const config = require('./config/common.json');
const request = require('request');
const http = require('http');

var app = express();

app.use(express.static('public'));

var reloadverdi = 10000;
var newTempValues = reloadverdi * 30;
var reloadIn = 0;

var port = config.port;
var ip = config.ip;

var fs = require('fs');
var util = require('util');
var oppstartstidspunkt = new Date();

var log_file = fs.createWriteStream(__dirname + '/logging' + oppstartstidspunkt.toISOString() +'.log', {flags : 'w'});
var log_stdout = process.stdout;


app.set('view engine', 'ejs');

var temperaturer = [];

var sensorverdier = [];
var devices = [];

var darkmode = "on";

// Fetching all devices from Telldus, updating devices-array
getDevices()

//var authorization = "Bearer " + config.authkey;
//logging("Authorization : " + authorization)

function getDevices(){
    (async () => {
    request({
	url: "http://" + config.ip + "/api/sensors/list",
	method: "GET",
	headers: {
	    "User-Agent": "sensors",
	    "Authorization": "Bearer " + config.authkey,
	    "Content-Type": "application/json",
	    "Accept": "application/json"
	  }
    }, (err, rs, body) => {
	try
	{
        	var values = JSON.parse(body);
        	//logging("Sensorverdier hentet ut:" + JSON.stringify(values));
        	devices = values.sensor;
        	//logging("Hentet ut devices!")
        } catch (e) {
		console.log('invalid json: ' + body);
        }
    });
    })();

}

function pad (length, str) {
    str = str.toString();
      return str.length < length ? pad("0" + str, length) : str;
}

function updateAllTemp(){
    var currentDate = new Date();
    getDevices()
    //logging("Oppdaterer temperaturer for følgende antall enheter: " +  devices.length);

    devices.forEach((element, index) => {
        (async () => {
            request({
		url: "http://" + config.ip + "/api/sensor/info?id=" + element.id,
		method: "GET",
		headers: {
		    "User-Agent": "sensors",
		    "Authorization": "Bearer " + config.authkey,
		    "Content-Type": "application/json",
		    "Accept": "application/json"
		}
            }, (err, rs, body) => {
            	try {
                	var values = JSON.parse(body);
                    	//logging("Hentet ut data");
                    	//logging("Full metering data:" + JSON.stringify(values));
                    	//logging("1: ReloadIn: " + reloadIn);
		    	if(values.data != undefined && values.data[0] !=undefined)
			{
				logging("Enhet nr: " + index + ", har verdi:" + values.data[0].value)
			} else
			{
				logging("Emhet nr: " + index + ", data undefined....")
			}
                    	sensorverdier[index] = values;
                    	if (values.model == config.outdoor) {
				if(reloadIn <= 0){
					reloadIn = newTempValues;
		                        logging("Funnet " + config.outdoor + ", legger til i grafarray")
        		                if (temperaturer.length > 479) {
        		                    temperaturer.shift();
                		        }
                        		var tempArray = [];
	  	              		tempArray[0] = values.data[0].value;
        		                tempArray[1] = currentDate.getHours() + ":" + pad(2, currentDate.getMinutes());
                		        tempArray[2] = values.data[1].value;
                        		temperaturer.push(tempArray);
    	                   		logging("ID for sensor:" + values.id);
	        	                logging("Values for sensor:" + tempArray[0] + ", " + tempArray[2]);
        	        	        logging("Time for value:" + tempArray[1]);
                	        	logging("Length of array:" + temperaturer.length);
				} else {
					reloadIn = reloadIn - reloadverdi;
				}
                	    	//logging("2: ReloadIn: " + reloadIn);
	                }
       	        } catch (e) {
			console.log('invalid json: ' + body);
	            	// updateTempLocal();
               	}
            });
        })();
    });
}


app.get('/mode/:mode', function (req, res) {
    if (req.params.mode != null) {
        if (req.params.mode == "1") {
            logging("Changing to nightmode")
            darkmode = "on";
            res.redirect('/')
        } else if (req.params.mode == "daymode") {
            logging("Changing to daymode")
            darkmode = "off";
            res.redirect('/')
        } else if (req.params.mode == "reload") {
            logging("Reloading, running normal get")
            res.redirect('/')
        } else {
            logging("NO action , not reloading")
            res.redirect('/')
        }
    }
})


app.get('/', function (req, res) {
	res.render('index',
	{
	       	temperaturer,
            sensorverdier,
		    darkmode
       	})
})

setInterval(function(){
    updateAllTemp();
}, reloadverdi);


var server = app.listen(port, function () {
    logging( "Server started, listening at port: " + port)
})


//Method for using the local API
function updateTempLocal(){
    var currentDate = new Date();
    var auth = "Bearer " + config.localauthkey;
    logging("(LOCAL) Oppdaterer temperaturer for følgende antall enheter: " +  devices.length);

    devices.forEach((element, index) => {
        var url = "http://192.168.1.253/api/sensor/info?id=" + element.id;
        (async () => {
            http.get(url, {headers: {"Authorization": auth}}, (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    var values = JSON.parse(data);
                    if (sensorverdier.length > 479) {
                        sensorverdier.shift();
                    }
                    sensorverdier[index] = values;
                    if (values.name == config.outdoor) {
                        logging("Funnet " + config.outdoor + ", legger til i grafarray")
                        if (temperaturer.length > 479) {
                            temperaturer.shift();
                        } else if (values != null && values.data != undefined) {
                            var tempArray = [];
                            tempArray[0] = values.data[0].value;
                            tempArray[1] = currentDate.getHours() + ":" + pad(2, currentDate.getMinutes());
                            tempArray[2] = values.data[1].value;
                            temperaturer.push(tempArray);
                            logging("ID for sensor:" + values.id);
                            logging("Value for sensor:" + tempArray[0]);
                            logging("Date for value:" + tempArray[1]);
                            logging("Lengt of array:" + temperaturer.length);
                            logging("Full metering data:" + JSON.stringify(values));
                        } else {
                            var tempArray = [];
                            tempArray[0] = "N/A";
                            tempArray[1] = currentDate.getHours() + ":" + pad(2, currentDate.getMinutes());
                            temperaturer.push(tempArray);
                        }
                    }
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        })();
    });
}

function logging(logtext)
{
        //const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
        let d = port + ":" + new Date().toISOString() + " : " + logtext;
        log_file.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
}

process.on('uncaughtException', err => {
	logging('Noe uventet feil har skjedd:' + err.message);
	logging('Noe uventet feil har skjedd:' + err.stack);
	process.exit(1)
})

process.on('SIGINT', () => {
	logging('Ctrl + C, stopper prosess');
	process.exit(0)
})

process.on('SIGTERM', () => {
	logging('Prosess terminert....');
	process.exit(0)
})



//function logging(logtext)
//{
//    console.log(port + ":" + new Date().toISOString() + " : " + logtext);
//}
