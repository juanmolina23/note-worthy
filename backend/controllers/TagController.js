const TagModel = require('../models/Tag');

const TagController = {
    find: async (req, res) => {
        const tag = await TagModel.findById(req.params.id);
        res.json(tag);
    },
    all: async (req, res) => {
        const tags = await TagModel.find();
        res.json(tags);
    },
    add: async (req, res) => {
        const newTag = new TagModel(req.body);
        const savedTag = await newTag.save();
        res.json(savedTag);
    },
    edit: async (req, res) => {
        const newTag = new TagModel(req.body);
        const tag = await TagModel.findById(req.params.id);
        tag.label = newTag.label;
        const savedTag = await tag.save();
        res.json(savedTag);
    },
    delete: async (req, res) => {
        //const foundTag = await TagModel.findById(req.params.id);
        const deleted = await TagModel.findByIdAndDelete(req.params.id);
        res.json(deleted)
    }
}

module.exports = TagController;