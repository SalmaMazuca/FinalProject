const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StorySchema = new Schema({
    name: String,
    author: String,
    description: String,
    release_year: Number,
    genre: String
});

const Story = mongoose.model('Story', StorySchema)
module.exports = Story;