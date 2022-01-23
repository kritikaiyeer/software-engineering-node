import express from 'express';
// import CourseController from "./controllers/CourseController";
const app = express();

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

// const courseController = new CourseController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);