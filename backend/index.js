const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const NoteController = require("./controllers/NoteController");
const TagController = require("./controllers/TagController");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/notes', NoteController.all);
app.get('/notes/:id', NoteController.find);
app.post('/notes/add', NoteController.add);
app.put('/notes/:id', NoteController.edit);
app.delete('/notes/:id', NoteController.delete);

app.get('/tags', TagController.all);
app.get('/tags/:id', TagController.find);
app.post('/tags/add', TagController.add);
app.put('/tags/:id', TagController.edit);
app.delete('/tags/:id', TagController.delete);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});