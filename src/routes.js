const {
  addNotehandler,
  getAllNotesHandler,
  getNoteById,
  editNotedByIdHandler,
  deleteNotedByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotehandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotedByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotedByIdHandler,
  },
];

module.exports = routes;
