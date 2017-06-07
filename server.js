var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;

var orders = require('./routes/orders');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/orders', orders);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public', '/views', 'index.html'));
});

var server = app.listen(port, function (req, res) {
  console.log('Now listening on port ' + port + '.');
  console.log('Go to localhost:' + port + ' to see site.');
  console.log('Ctrl+C shuts down server.');
});

module.exports = server;
