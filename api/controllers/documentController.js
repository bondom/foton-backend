'use strict';
var mongoose = require('mongoose'),
  fs = require('fs'),
  multiparty = require('multiparty'),
  util = require('util'),
  Document = mongoose.model('Documents');

exports.get_all_documents = function(req, res) {
  console.log('get_all_documents executes');
  Document.find({}, function(err, documents) {
    if(err)
      res.send(err);
    res.json(documents);  
  })
}  

exports.add_new_document = function(req, res) {
  var form = new multiparty.Form();

  form.on('error', function(err) {
    // stream ended unexpectedly - when there is no file in request 
    console.log('Error parsing form: ' + err.stack);
    res.status(400).send('Error occured');
  });

  form.on('part', function(part) {
    console.log(part);
    if (!part.filename) return;

    let base64string = '';
    part.on('data', (chunk) => {
      base64string += chunk.toString();
    });

    part.on('end', (data) => {
      console.log('end');
      console.log(base64string.substring(0, 100));
      //cut off data:application/pdf;base64,
      const base64stringWithoutMimetype = base64string.substring(base64string.indexOf(',') + 1, base64string.length)
      console.log(base64stringWithoutMimetype.substring(0, 100));
      // fs.writeFileSync('res2.pdf', new Buffer(base64stringWithoutMimetype, 'base64'));

      var model = new Document();
      model.document.data = base64string; 
      model.document.name =  part.filename;
      model.save(function(err, doc) {
        if (err)
          res.send(err);
        res.send(doc);
      });
    }); 
  });

  form.parse(req);
};

exports.delete_a_document = function(req, res) {
  Document.remove({
    _id: req.params.documentsId
  }, function(err, document) {
    if (err)
      res.send(err);
    res.json({ message: 'Document successfully deleted' });
  });
};