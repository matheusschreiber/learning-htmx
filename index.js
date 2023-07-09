import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express();

var _counter = 0;

app.get("/", (req,res)=> {
  res.render('index.pug', {counter: _counter})
})

app.get("/counter", (req,res)=> {
  res.render('counter.pug', {counter: _counter})
})

app.post("/add", (req,res)=>{
  _counter++;
  res.redirect("/counter");
})

app.post("/sub", (req,res)=>{
  if (_counter>0) _counter--;
  res.redirect("/counter");
})


app.listen(process.env.PORT, ()=>console.log("Listening on port " + process.env.PORT))

export default app;