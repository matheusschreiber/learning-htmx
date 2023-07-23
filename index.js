import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }));

// app.set('views', process.cwd() + '/views');
// app.set('view engine', 'pug');

/**
 * HOME ROUTE
 */

app.get("/", (req,res)=> {
  res.render('index.pug')
})


/**
 * COUTER ROUTES
*/

var _counter = 0;

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

var _animal_directory= "";

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
 * TODO ROUTES
 */

var _todo_tasks = [
  ["Levar o lixo para fora", 0],
  ["Regar as plantas", 0],
  ["Arrumar a casa", 1],
  ["Fazer as compras do mẽs", 1],
  ["Pagar conta de luz", 0],
]

app.get("/todo", (req,res)=> {
  res.render('todo/index.pug', {tasks: _todo_tasks})
})

app.post("/todo/update-task/:index", (req,res)=> {
  _todo_tasks[req.params.index][1] = _todo_tasks[req.params.index][1]==1 ? 0 : 1;
  res.render('todo/todos.pug', {tasks: _todo_tasks})
})

app.post("/todo/delete-task/:index", (req,res)=> {
  _todo_tasks.splice(req.params.index, 1)
  res.render('todo/todos.pug', {tasks: _todo_tasks})
})

app.post("/todo/add-task", (req,res)=> {
  const { task } = req.body
  _todo_tasks.push([task, 0])
  res.render('todo/todos.pug', {tasks: _todo_tasks})
})


/**
 * SERVING STATIC FILES
 */

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/globals.css', express.static(process.cwd() + '/globals.css'));


/**
 * APP LISTEN
 */

app.listen(process.env.PORT, ()=>console.log("Listening on port " + process.env.PORT))

export default app;