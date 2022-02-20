import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmark"});
export default BookmarkSchema;