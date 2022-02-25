/**
 * @file Controller RESTful Web service API for Message resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageControllerI";
 
 /**
  * @class MessageController Implements RESTful Web service API for Message resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/messages/sent to retrieve all the message sent by user
  *     </li>
  *     <li>GET /api/users/:uid/messages/received to retrieve all message sent to user
  *     </li>
  *     <li>POST /api/users/:from/messages/:to to record that a user sent message to another user
  *     </li>
  *     <li>DELETE /api/users/:from/messages/:id to record that a user
  *     unsent a message</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return MessageController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
             app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesSentToUser);
             app.post("/api/users/:from/messages/:to", MessageController.messageController.userSendsMessage);
             app.delete("/api/users/:from/messages/:id", MessageController.messageController.userUnsendsMessage);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all messages sent by a user
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the messages sent by user
      */
      findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
             .then(message => res.json(message));
 
     /**
      * Retrieves all messages sent to user 
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the messages that are sent to the user
      */
      findAllMessagesSentToUser = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
             .then(message => res.json(message));
 
     /** 
      * @param {Request} req Represents request from client, including the
      * path parameters uid and uidFollowing representing the user that is following another user
      * and other user is being followed.
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new message that was inserted in the
      * database
      */
      userSendsMessage = (req: Request, res: Response) =>
         MessageController.messageDao.userSendsMessage(req.params.from, req.params.to, req.body)
             .then(message => res.json(message));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and uidFollowing representing the user that is unfollowing
      * another user and the other user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the message was successful or not
      */
      userUnsendsMessage = (req: Request, res: Response) =>
         MessageController.messageDao.userUnsendsMessage(req.params.from, req.params._id)
             .then(status => res.send(status));
 };