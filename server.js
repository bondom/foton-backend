var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/documentModal'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/documentdb', function(err) {
  if (err) {
      console.err('Error when connecting to mongodb:' + err);
  } else {
      console.log('Connected');
  }    
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req,res,next) => {
  console.log(`Request: ${req.originalUrl}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  next();
});


var routes = require('./api/routes/documentRoute'); //importing route
routes(app); //register the route

app.listen(port);

console.log('document RESTful API server started on: ' + port);

// mongod --dbpath /var/lib/mongodb --fork --logpath /var/log/mongodb.log - start mongodb as daemon with log file
// /opt/mongo - path to mongo repo with installed mongo and mongod