'use strict';
var mongoose = require('mongoose'),
  fs = require('fs'),
  multiparty = require('multiparty'),
  util = require('util'),
  Document = mongoose.model('Documents');

exports.get_all_documents = function(req, res) {
  Document.find({}, function(err, documents) {
    if(err)
      res.send(err);
    res.json(documents);  
  })
}  

exports.add_new_document = function(req, res) {

  var model = new Document();

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(files == null || files.length === 0) {
      res.status(400).send('Please send file');
      return;
    }
    const fileInfo = files.myFile[0];
    const fileContent = fs.readFileSync(fileInfo.path);
    // encode to utf-8 bytes and base64 encode
    model.document.data = Buffer.from(fileContent).toString('base64');
    model.document.name = fileInfo.originalFilename;
    model.save(function(err, doc) {
      if (err)
        res.send(err);
      res.send(doc);
    });
  });
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