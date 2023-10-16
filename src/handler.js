// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotehandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di tambahkan',
      data: {
        noteId: id,
      },
    });
    response.code = 201;
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan Gagal ditamabahkan',
  });
  response.code = 500;
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteById = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });

  response.code = 404;
  return response;
};

const editNotedByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di perbarui',
    });
    response.code(200);

    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan',
  });

  response.code(404);
  return response;
};
const deleteNotedByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((x) => x.id === id);
  if (index !== -1) {
    notes.splice(index, 1);

    return {
      status: 'success',
      message: 'Catatan berhasil di hapus',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNotehandler,
  getAllNotesHandler,
  getNoteById,
  editNotedByIdHandler,
  deleteNotedByIdHandler,
};
