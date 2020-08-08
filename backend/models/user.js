const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //3rd party plugin

const userSchema = mongoose.Schema({ //In JS, uppercase S, typescript use lowercase s
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //validate the data, error will be there if the use already exists

module.exports = mongoose.model("User", userSchema); //'User' is the name of the schema, the collection name will be 'users'
