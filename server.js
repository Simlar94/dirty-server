var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var usbDetect = require('usb-detection');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
// Parse application/json
app.use(bodyParser.json());
//Start USB-detection
usbDetect.startMonitoring();

// USB-connect POST
usbDetect.on('add', function (device) {

    var jsonDataObj = {
        'status': "true"
    };
    
    request.post({
        url: 'https://shielded-caverns-32573.herokuapp.com/dirty',
        body: jsonDataObj,
        json: true
    }, function (error, response, body) {
        console.log(body);
    });   
});

// USB-disconnect POST
usbDetect.on('remove', function (device) {

    var jsonDataObj = {
        'status': "false"
    };
    request.post({
        url: 'https://shielded-caverns-32573.herokuapp.com/dirty',
        body: jsonDataObj,
        json: true
    }, function (error, response, body) {
        console.log(body);
    });
});

// Server port.
app.listen(3000, function (error) {
    if (!error) {
        console.log("Server is running on port 3000.")
    } else {
        console.log("Error. Something went wrong.")
    }
});
