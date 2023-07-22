import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express();

var _counter = 0;
var _animal_directory= "";

/**
 * HOME ROUTE
 */

app.get("/", (req,res)=> {
  res.render('index.pug')
})


/**
 * COUTER ROUTES
 */

app.get("/counter", (req,res)=> {
  res.render('counter/index.pug', {counter: _counter})
})

app.get("/update-counter", (req,res)=> {
  res.render('counter/counter.pug', {counter: _counter})
})

app.post("/add", (req,res)=>{
  _counter++;
  res.redirect("/update-counter");
})

app.post("/sub", (req,res)=>{
  if (_counter>0) _counter--;
  res.redirect("/update-counter");
})


/**
 * ANIMALS ROUTES
 */

app.get("/animals", (req,res)=> {
  res.render('animals/index.pug', {directory: _animal_directory})
})

app.get("/update-animal-pic", (req,res)=> {
  res.render('animals/pic.pug', {directory: _animal_directory })
})

app.post("/animal/:animal", (req,res)=>{
  _animal_directory = `public/${req.params.animal}.jpg` 
  res.redirect("/update-animal-pic");
})


/**
 * SERVING STATIC IMAGES
 */

app.use('/public', express.static(process.cwd() + '/public'));


/**
 * APP LISTEN
 */

app.listen(process.env.PORT, ()=>console.log("Listening on port " + process.env.PORT))

export default app;