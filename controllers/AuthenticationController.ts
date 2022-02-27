import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {
    
    const userDao: UserDao = UserDao.getInstance();

    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password)
        const existingUser = await userDao
            .findUserByUsername(username);
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    const register = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    const profile = (req: Request, res: Response) =>
        // @ts-ignore
        res.json(req.session['profile']);

    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/security/login", login);
    app.post("/api/security/register", register);
    app.post("/api/security/profile", profile);
    app.post("/api/security/logout", logout);
}

export default AuthenticationController;