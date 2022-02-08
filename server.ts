import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

const app = express();

mongoose.connect('mongodb://localhost:27017/tuiter'); // connect to the movie-db database
app.use(express.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);