/**
 * @file Controller RESTful Web service API for Follow resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for follow resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /users/:uid/following to retrieve all the users followed by a user
  *     </li>
  *     <li>GET /users/:uid/followed to retrieve all users that following them
  *     </li>
  *     <li>POST/user/:uid/follow/:uidFollowing to record that a user follows another user
  *     </li>
  *     <li>DELETE/user/:uid/unfollow/:uidFollowing to record that a user
  *     no londer follows a user</li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
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
             app.post("/api/users/:uid/follows/:uidFollowing", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uid/unfollow/:uidFollowing", FollowController.followController.userUnfollowsUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that follow a particular user
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the follow objects
      */
      findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all users followed by user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the users followed by user
      */
      findAllUsersFollowedByUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and uidFollowing representing the user that is following another user
      * and other user is being followed.
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follow that was inserted in the
      * database
      */
      userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid, req.params.uidFollowing)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and uidFollowing representing the user that is unfollowing
      * another user and the other user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follow was successful or not
      */
      userUnfollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uidFollowing)
             .then(status => res.send(status));
 };