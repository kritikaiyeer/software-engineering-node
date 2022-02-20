/**
 * @file Declares Message data type representing relationship between 
 * users, as in user sends message to other user
 */
 import User from "./User";
 
 /**
  * @typedef Message Represents message relationship between users, as in user sends message to other user.
  * @property {String} Message message to be sent
  * @property {User} to the user where message needs to be delivered
  * @property {User} from the user who sends message
  * @property {Date} sentOn date of sending the message
  */
 
 export default interface Bookmark {
     message: String,
     to: User,
     from: User,
     sentOn: Date
 };
