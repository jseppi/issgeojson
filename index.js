var geojson = require('geojson');
var request = require('request');
var express = require('express');
var cors = require('cors');

var ISS_API_URL = "https://api.wheretheiss.at/v1/satellites/25544";

var port = process.env.PORT || 5000;
var app = express();

app.use(cors());

app.get('/', function (req, res) {
  request(ISS_API_URL, function (err, resp, body) {
    if (err) {
      console.log(err);
      res.status(400).json({error: 'Unable to contact ISS API'});
      return;
    }

    var issStatus = JSON.parse(body);
    var issGj = geojson.parse([issStatus], {Point: ['latitude', 'longitude']});

    res.json(issGj);
  });
});

app.listen(port, function () {
  console.log("App listening on port " + port);
});
