/**
 * @file Declares Follow data type representing relationship between two
 * users, as in user follows another user
 */
 
 import User from "./User";
 
 /**
  * @typedef Follow Represents follow relationship between two users,
  * as in user follows another user
  * @property {User} follow User follows another user
  */
 
 export default interface Follow {
     userFollowed: User,
     userFollowing: User
 };
