'use strict';
module.exports = function(app) {
  var documents = require('../controllers/documentController');

  app.route('/api/documents')
    .get(documents.get_all_documents)
    .post(documents.add_new_document);
  
  app.route('/api/documents/:documentsId')
    .delete(documents.delete_a_document);
};