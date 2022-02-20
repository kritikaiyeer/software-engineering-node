import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmark related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
};