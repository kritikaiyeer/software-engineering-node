/**
 * @file Controller RESTful Web service API for users resource
 */
import UserDao from "../daos/UserDao";
import User from "../models/User";
import {Express, Request, Response} from "express";
import UserControllerI from "../interfaces/UserController";

/**
  * @class UserController Implements RESTful Web service API for tuits resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users to create a new users</li>
  *     <li>GET /api/users/:uid to retrieve all the users by id </li>
  *     <li>GET /api/users to retrieve all users instances</li>
  *     <li>PUT /api/users/:uid to modify an individual user instance </li>
  *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
  * </ul>
  * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
  * @property {UserController} userController Singleton controller implementing
  * RESTful Web service API
  */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return UserController
      */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            app.get("/api/hello", (req, res) => res.send('hello from users'));
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
        }
        return UserController.userController;
    }

    private constructor() {}

    /**
      * Retrieves all users from the database and returns an array of users.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the users objects
      */

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then((users: User[]) => res.json(users));
     /**
      * Retrieves user object from the database for a particular user id and returns
      * a user object.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));
    /**
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the user object
      */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then((user: User) => res.json(user));
    /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the user to be modified
      * @param {Response} res Represents response to client, including status
      * on whether updating a user was successful or not
      */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));
};