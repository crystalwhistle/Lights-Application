var crimes;
var lightslatLng = [];
var crimeslatLng = [];
var GoogleMapsAPI = require('googlemaps')
var request = require("request");

exports.getCrimes = function(req, res) {
    var data = require('../crime_data.json')
    lights = data;
    res.json(data);
}

exports.getLights = function(req, res) {
    var data = require('../street_lights.json');
    // console.log(data)
    for (dat in data.data) {
    	var point = data.data[dat]
        lightslatLng.push([point.lat, point.lon])
    }
    res.json({lights: lightslatLng});
}

exports.getCurrentCrimes = function(req, res) {
    var d = new Date();
    var n = d.getTime();
    request("http://api.spotcrime.com/crimes.json?lat=32.713006&lon=-117.160776&radius=8.00&callback=jQuery21307676314746535686_1462858455579&key=.&_=" + n, function(error, response, body) {
        var i = body.indexOf('{')
        var data = JSON.parse(body.substring(i, body.length - 1));
        console.log("done loading current crimes")

        res.json(data)
    });
}

var mockRequest = function(options, callback) {
    var res = {
        statusCode: 200
    };
    console.log(options)
    console.log(callback)
    var data = JSON.stringify([]);
    return callback(null, res, data);
};

exports.getDirections = function(req, res) {

    // var config = {
    //     key: 'AIzaSyAcpvjQfNGee-cz_5z4BdkK4EGCxbgCbfA'
    // };

    // var gm = new GoogleMapsAPI(config);
    // console.log("getDirections")
    // var start = "3633 Nobel Dr, San Diego, CA 92122"
    // var end = "9500 Gilman Dr, La Jolla, CA 92093"
    // var params = {
    //     origin: start,
    //     destination: end,
    //     alternatives: true,
    //     encode_polylines: true,

    // };
    // gm.directions(params, function(err, result) {
    //     // console.log(result)
    //     console.log(result.routes[0].legs[0].steps[0].polyline)

        // var polyline = gm.Polyline({
        //     path: [],
        //     strokeColor: '#FF0000',
        //     strokeWeight: 3
        // });
        // var bounds = new google.maps.LatLngBounds();


        // var legs = response.routes[0].legs;
        // for (i = 0; i < legs.length; i++) {
        //     var steps = legs[i].steps;
        //     for (j = 0; j < steps.length; j++) {
        //         var nextSegment = steps[j].path;
        //         for (k = 0; k < nextSegment.length; k++) {
        //             polyline.getPath().push(nextSegment[k]);
        //             bounds.extend(nextSegment[k]);
        //         }
        //     }
        // }

    // });

}