/**
 * @file Implements mongoose schema to CRUD
 * documents in the tuit collection
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
/**
* @typedef Tuit Represents Tuit
* @property {ObjectId[]} tuit tuit id  
* @property {ObjectId[]} postedBy user id 
*/
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;