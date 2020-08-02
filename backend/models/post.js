const mongoose = require("mongoose");

const postSchema = mongoose.Schema({ //In JS, uppercase S, typescript use lowercase s
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Post", postSchema); //'Post' is the name of the schema, the collection name will be 'posts'
