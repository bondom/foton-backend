var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/documentModal'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/documentdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  next();
});


var routes = require('./api/routes/documentRoute'); //importing route
routes(app); //register the route

app.listen(port);

console.log('document RESTful API server started on: ' + port);