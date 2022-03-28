var express = require('express');
const config = require('./config/common.json');
const http = require('http');

var app = express();

app.use(express.static('public'));

var port = config.port;

var values = [1];
var labels = ['Init...'];

app.set('view engine', 'ejs');

var temperaturer = [];

var darkmode = "off";

//var firstDayInMonth = setFirstDay(new Date());
//var firstDayInPrevMonth = setfirstPrevMonth(new Date());


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
		darkmode
       	})
})

updateTemp();

function updateTemp(){
	var currentDate = new Date();

	var auth = "Bearer " + config.authkey;
	var url = "http://192.168.1.253/api/sensor/info?id=6 ";

	logging("Running update of temp...");

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
		}
		var tempArray = [];
		tempArray[0] = values.data[0].value;
		tempArray[1] = currentDate.getHours() + ":" + currentDate.getMinutes();
		temperaturer.push(tempArray);
                logging("ID for sensor:" + values.id);
                logging("Value for sensor:" + tempArray[0]);
                logging("Date for value:" + tempArray[1]);
                logging("Lengt of array:" + temperaturer.length);
                logging("Full metering data:" + JSON.stringify(values));
            });
	 }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    })();
}


setInterval(function(){
	updateTemp();
}, 600000);

function logging(logtext)
{
    console.log(port + ":" + new Date().toISOString() + " : " + logtext);
}

var server = app.listen(port, function () {
    logging( "Server started, listening at port")
})
