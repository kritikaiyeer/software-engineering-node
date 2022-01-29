/**
 * @file Server file
 */
import express, {Request, Response} from 'express';
import CourseController from "./controllers/CourseController";
import mongoose from "mongoose";
const app = express();
mongoose.connect('mongodb://localhost:27017/cs5500-test-123');

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const courseController = new CourseController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);