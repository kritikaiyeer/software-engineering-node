/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
 import {Express, Request, Response} from "express";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmark resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/bookmarks to retrieve all the bookmarked tuits by user
  *     </li>
  *     <li>POST /api/user/:uid/bookmarks/:tid to record a user bookmarks a tuit
  *     </li>
  *     <li>DELETE/api/user/:uid/bookmarks/:tid to record that a user
  *     no londer bookmarks a tuit</li>
  * </ul>
  * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
  * @property {BookmarkController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 export default class BookmarkController implements BookmarkControllerI {
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return BookmarkController
      */
     public static getInstance = (app: Express): BookmarkController => {
         if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
             app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
             app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
             app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
         }
         return BookmarkController.bookmarkController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all tuits that are bookmarked by the user
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuits bookmarked by user
      */
      findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is bookmarking the tuit
      * and the tuit being bookmarked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new bookmarks that was inserted in the
      * database
      */
      userBookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unbookmarking
      * the tuit and the tuit being unbookmarked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the bookmark was successful or not
      */
      userUnbookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
 };