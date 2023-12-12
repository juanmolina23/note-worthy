const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  }, 
  createdAt: Date,
  updatedAt: Date
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;