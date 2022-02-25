/**
 * @file Implements mongoose schema to CRUD
 * documents in the message collection
 */
import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";
/**
* @typedef Message Represents Message
* @property {String} message message
* @property {ObjectId[]} to user id  sending message
* @property {ObjectId[]} from user id receiving message
* @property {Date} sentOn Date
*/
const MessageSchema = new mongoose.Schema<Message>({
    message: String,
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: Date
}, {collection: "message"});
export default MessageSchema;