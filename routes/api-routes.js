// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model

var path = require("path");


var moment = require('moment');
var passhash = require('password-hash-and-salt');
var security;
var userArray = [];
var session;
const Lyricist = require('lyricist/node6');
const accessToken = "chTN2RA_5ChmZXkMZIKN8z4WnIoS0x7Q9FP3czbCXPGdTE9EMbLQgKJSnvsqm0Pn"
var mysql = require("mysql");
var hamTracks;
const lyricArray = [];
const finalLyricArray = [];







// Routes
// =============================================================
module.exports = function (app) {

  var connection = mysql.createConnection({
    host: "bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "tdvjvjugdyc44t1p",
    password: "w579cl2u3j1ojaal",
    database: "mroulygl42e5y8jp"
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log(connection);

  });



  app.get("/api/tracklist", function (req, res) {
    const lyricist = new Lyricist(accessToken);
    lyricist.album(131575, {
      fetchTracklist: true
    }).then(function (data) {


      res.json(data);
    });
  });


  app.get('/lyric/:id?', function (req, res, next) {
    var id = req.params.id;
    if (id) {
      const lyricist = new Lyricist(accessToken);
      lyricist.song(id, {
        fetchLyrics: true
      }).then(function (data) {

        var preSplit = data.lyrics;
        //    console.log(preSplit);
        var postSplit = preSplit.split(" ");

        hamTracks = postSplit;
        importMe();
        res.json(data);
        console.log(hamTracks);
      });
    } else {
      next();
    }
    console.log("yo");
 
  });

  function importMe() {
    var n = hamTracks.length;
    for (var i = 0; i < n; i++) {
      connection.query("INSERT INTO mroulygl42e5y8jp.lyrics SET ?", {
        word: hamTracks[i]
      }, function (err, res) {
        if (err) throw err;
      });
    }
  }
  app.post('/hamport', function (req, res) {

    console.log(req.body);
    console.log("posted");
    // res.send(req.body);

  })


};