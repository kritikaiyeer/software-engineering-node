/**
 * @file Server file
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://giuseppi:supersecretpassword@cluster0.m8jeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
import bodyParser from "body-parser";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
const app = express();
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);