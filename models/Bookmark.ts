/**
 * @file Declares Bookmark data type representing relationship between 
 * users and tuits, as in user bookmark tuits
 */
 import Tuit from "./Tuit";
 import User from "./User";
 
 /**
  * @typedef Bookmark Represents bookmark relationship between user and tuit, as in user bookmars tuits.
  * @property {Tuit} bookmarkedTuit tuit bookmarked by the user
  * @property {User} bookmarkedBy user who bookmarked the tuit
  */
 
 export default interface Bookmark {
     bookmarkedTuit: Tuit,
     bookmarkedBy: User
 };
