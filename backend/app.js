const express = require("express"); //Initilize express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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


app.use((req,res,next) => { //Middleware need to have a next() to move on to the next response
  res.setHeader('Access-Control-Allow-Origin', '*'); //Allow which domain are allow (which is all in this case b/c of '*')
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept'); //Domain sending requests with a certain set of headers besides the default headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });//Save the data as a query to the database
});


app.get("/api/posts",(req, res, next) => { //target the path to reach the code inside app.use
  Post.find().then(documents => { //This will return all results
      // console.log(documents);
      res.status(200).json({
        message: "Posts fetch successfully!",
        posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => { //access to an id property dynamically
  console.log('Removing object with ID: ' + req.params.id); //id was received as part of the URL
  Post.deleteOne({_id: req.params.id}).then(result => { //DeleteOne operation where we passed JS object inside the {}
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

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
