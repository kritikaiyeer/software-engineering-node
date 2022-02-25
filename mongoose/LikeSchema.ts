/**
 * @file Implements mongoose schema to CRUD
 * documents in the likes collection
 */

import mongoose, {Schema} from "mongoose";
import Like from "../models/Likes";
/**
* @typedef Like Represents Like
* @property {ObjectId[]} tuit Tuid Id  liked
* @property {ObjectId[]} likedBy User Id who liked the tuit
*/
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;