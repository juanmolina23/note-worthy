const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  }
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;