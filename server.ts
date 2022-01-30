/**
 * @file Server file
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
const app = express();
mongoose.connect('mongodb://localhost:27017/cs5500-test-123');
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);