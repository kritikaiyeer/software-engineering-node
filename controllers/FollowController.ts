/**
 * @file Controller RESTful Web service API for Follow resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /users/:uid/following to retrieve all the users followed by a user
  *     </li>
  *     <li>GET /users/:uid/followed to retrieve all users that following them
  *     </li>
  *     <li>POST/user/:uid/follow/:uid to record that a user follows another user
  *     </li>
  *     <li>DELETE/user/:uid/unfollow/:uid to record that a user
  *     no londer follows a user</li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return FollowController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
             app.get("/api/users/:uid/followed", FollowController.followController.findAllUsersThatFollowUser);
             app.get("/api/users/:uid/following", FollowController.followController.findAllUsersFollowedByUser);
             app.post("/api/users/:uid/follow/:uidFollowing", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uid/unfollow/:uidFollowing", FollowController.followController.userUnfollowsUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
      findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
      findAllUsersFollowedByUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being liked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
      userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid, req.params.uidFollowing)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
      userUnfollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uidFollowing)
             .then(status => res.send(status));
 };