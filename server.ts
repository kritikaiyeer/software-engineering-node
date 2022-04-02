/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follow<li>
 *     <li>bookmark<li>
 *     <li>message<li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';
import AuthenticationController from './controllers/AuthenticationController';
import SessionController from './controllers/SessionController';
const cors = require("cors");
const session = require("express-session");

// connect to the database
mongoose.connect('mongodb+srv://tuiteradmin:'+'tuiter' +'@cluster0.yj2qt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); // connect to the movie-db database
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));

let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session(sess))
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
SessionController(app);
AuthenticationController(app);


/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */

const PORT = 4000;
app.listen(process.env.PORT || PORT);