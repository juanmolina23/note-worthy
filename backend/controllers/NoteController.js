const NoteModel = require('../models/Note');

const NoteController = {
    find: async (req, res) => {
        const note = await NoteModel.findById(req.params.id).populate("tags");
        res.json(note);
    },
    all: async (req, res) => {
        const notes = await NoteModel.find().populate("tags");
        res.json(notes);
    },
    add: async (req,res) => {
        const newNote = new NoteModel(req.body);
        const savedNote = await newNote.save();
        res.json(await savedNote.populate("tags"));
    },
    edit: async (req, res) => {
        const newNote = new NoteModel(req.body);
        const note = await NoteModel.findById(req.params.id);
        note.title = newNote.title;
        note.markdown = newNote.markdown;
        note.tags = newNote.tags;
        const savedNote = await note.save();
        res.json(savedNote);
    },
    delete: async (req, res) => {
        const deleted = await NoteModel.findByIdAndDelete(req.params.id);
        res.json(deleted)
    }
}

module.exports = NoteController;