import app from "../index.js"

app.set('views', process.cwd() + '../views');
app.set('view engine', 'pug');

export default app;