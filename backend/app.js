const path = require("path");
const express = require("express"); //Initilize express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts');

const app = express(); //Calling express framework assign and using through 'app'

mongoose
  .connect(
    'mongodb+srv://han:Hviponlin3@cluster0.4uy0y.mongodb.net/node-angular?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json()); //bodyParser can parse different kind of body
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images"))); //allow to continue and fetch the file from here

//npm install --save multer
//extract incoming file package

app.use((req, res, next) => { //Middleware need to have a next() to move on to the next response
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allow which domain are allow (which is all in this case b/c of '*')
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //Domain sending requests with a certain set of headers besides the default headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;

//dummy data
// const posts = [
  //   {
  //   id: 'fadf12312',
  //   title:'First serve-side post',
  //   content:'This is coming from the server!'
  //   },
  //   {
  //     id:'dsadsadas',
  //     title:'Second serve-side post',
  //     content:'This is coming from the server!'
  //   }
  // ];
