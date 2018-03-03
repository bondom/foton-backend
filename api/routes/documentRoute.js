'use strict';
module.exports = function(app) {
  var documents = require('../controllers/documentController');

  app.route('/documents')
    .get(documents.get_all_documents)
    .post(documents.add_new_document);
  
  app.route('/documents/:documentsId')
    .delete(documents.delete_a_document);
};