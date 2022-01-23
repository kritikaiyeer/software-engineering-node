import express from 'express';
import CourseController from "./controllers/CourseController";
import mongoose from "mongoose";
const app = express();
mongoose.connect('mongodb://localhost:27017/cs5500-test-123');

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const courseController = new CourseController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);