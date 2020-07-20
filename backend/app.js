const express = require('express'); //Initilize express

const app = express(); //Calling express assign into app

app.use((req, res, next ) =>{
  console.log('First middleware'); //Important to call next, if not sending a reponse
  next();
});

app.use((req, res, next) => {
  res.send('Hello from Express222');
})

module.exports = app;
