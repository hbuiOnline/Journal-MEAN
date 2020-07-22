//Content 69: Re Organize the backend routes

const express = require('express');

const Post = require("../models/post");


const router = express.Router();

router.post('', (req, res, next) => {
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

//Content 67
//patch: only update the resource with the new value
router.put("/:id", (req, res, next) => {//Put the new resource and completely replace the old one
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.connect
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    // console.log(result);
    res.status(200).json({message: 'Updated Successful!'});
  });
});



router.get("",(req, res, next) => { //target the path to reach the code inside app.use
  Post.find().then(documents => { //This will return all results
      // console.log(documents);
      res.status(200).json({
        message: "Posts fetch successfully!",
        posts: documents
        });
    });
});

router.get('/:id', (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  });
});

router.delete("/:id", (req, res, next) => { //access to an id property dynamically
  console.log('Removing object with ID: ' + req.params.id); //id was received as part of the URL
  Post.deleteOne({_id: req.params.id}).then(result => { //DeleteOne operation where we passed JS object inside the {}
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = router;
