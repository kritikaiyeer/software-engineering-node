import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';


dotenv.config();

const app = express();
mongoose.connect('mongodb+srv://tuiteradmin:'+process.env.DB_PASSWORD +'@cluster0.yj2qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); // connect to the movie-db database
app.use(express.json())

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));


const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);