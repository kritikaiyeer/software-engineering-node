/**
 * @file Implements mongoose schema to CRUD
 * documents in the bookmark collection
 */

import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";
/**
* @typedef Bookmark Represents Bookmark
* @property {ObjectId[]} bookmarkedTuit Tuid Id  
* @property {ObjectId[]} bookmarkedBy User Id
*/

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmark"});
export default BookmarkSchema;