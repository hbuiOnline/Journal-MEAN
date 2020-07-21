const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true }, //In JS, uppercase S, typescript use lowercase s
  content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema); //'Post' is the name of the schema, the collection name will be 'posts'
