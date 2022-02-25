/**
 * @file Implements mongoose schema to CRUD
 * documents in the follow collection
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";
/**
* @typedef Follow Represents Follow
* @property {ObjectId[]} userFollowed user Id who followee  
* @property {ObjectId[]} userFollowing User Id following
*/
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follow"});
export default FollowSchema;