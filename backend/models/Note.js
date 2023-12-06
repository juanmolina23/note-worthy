const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Types.ObjectId,
    ref: "Tag"
  }]
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;