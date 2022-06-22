var express = require('express');
const config = require('./config/common.json');
const request = require('request');

var app = express();

app.use(express.static('public'));

var port = config.port;

var values = [1];
var labels = ['Init...'];

app.set('view engine', 'ejs');

var temperaturer = [];

var sensorverdier = [];
var devices = [];

var darkmode = "on";

// Fetching all devices from Telldus, updating devices-array
getDevices()

function getDevices(){
    (async () => {
    request({
        url: "https://api.telldus.com/json/sensors/list",
        method: "GET",
        oauth: {
            consumer_key: config.Publickey,
            consumer_secret: config.PrivateKey,
            token: config.Token,
            token_secret: config.TokenSecret
        },
        headers: {
            "content-type": "application/json"
        }
    }, (err, rs, body) => {
        var values = JSON.parse(body);
        logging("Sensorverdier hentet ut:" + JSON.stringify(values));
        devices = values.sensor;
        logging("Alt hentet ut!")
        updateAllTemp()
    });
    })();

}

function pad (length, str) {
    str = str.toString();
      return str.length < length ? pad("0" + str, length) : str;
}

function updateAllTemp(){
    var currentDate = new Date();
    logging("Oppdaterer temperaturer for følgende antall enheter: " +  devices.length);

    devices.forEach((element, index) => {
        (async () => {
            request({
                url: "https://api.telldus.com/json/sensor/info?id=" + element.id,
                method: "GET",
                oauth: {
                    consumer_key: config.Publickey,
                    consumer_secret: config.PrivateKey,
                    token: config.Token,
                    token_secret: config.TokenSecret
                },
                headers: {
                    "content-type": "application/json"
                }
            }, (err, rs, body) => {
                var values = JSON.parse(body);
                //logging("Full metering data:" + JSON.stringify(values));
                if (sensorverdier.length > 479) {
                    sensorverdier.shift();
                }
                sensorverdier[index] = values;
                if (values.name == config.outdoor) {
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
}, 300000);

function logging(logtext)
{
    console.log(port + ":" + new Date().toISOString() + " : " + logtext);
}

var server = app.listen(port, function () {
    logging( "Server started, listening at port: " + port)
})


//Method for using the local API
function updateTemp(){
    var currentDate = new Date();

    var auth = "Bearer " + config.localauthkey;
    var url = "http://192.168.1.253/api/sensor/info?id="+ider[0];

    logging("Oppdaterer utetemperatur...");

    (async () => {
        http.get(url, {headers : {"Authorization" : auth}} , (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                var values = JSON.parse(data);
                if(temperaturer.length>479){
                    temperaturer.shift();
                } else if (values != null && values.data != undefined){
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

            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })();
}