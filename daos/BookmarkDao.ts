/**
 * @file Implements DAO managing data storage of bookmark. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
/**
  * @class BookmarkDao Implements Data Access Object managing data storage
  * of Bookmark
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}
    /**
      * Retrieves all tuits that are bookmarked by the user
      * @param {String} uid uid representing the user
      */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
    /**
      * @param {String} uid  user id
       * @param {String} tid  tuit id
      */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});
    /**
      * @param {String} uid user id
      * @param {String} uid tuit id that needs to deleted
      */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
}