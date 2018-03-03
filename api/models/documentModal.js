'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DocumentSchema = new Schema({
  document: {
    name: String,
    data: Buffer 
  },
});

module.exports = mongoose.model('Documents', DocumentSchema);