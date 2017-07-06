var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 8080;

const Lyricist = require('lyricist/node6');
const accessToken = "chTN2RA_5ChmZXkMZIKN8z4WnIoS0x7Q9FP3czbCXPGdTE9EMbLQgKJSnvsqm0Pn"
// const lyricist = new Lyricist(accessToken);
// lyricist.album(131575, {
//     fetchTracklist: true
// }).then(function (data) {
//     console.log(data);
// });

// hamilton album id is 131575

var db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static(path.join(__dirname, "./public")));
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


db.sequelize.sync({
    force: false
}).then(function () {
    server.listen(port, function () {
        console.log('server listening on port: ' + port);
    });
});