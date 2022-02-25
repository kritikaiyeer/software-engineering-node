/**
 * @file Implements Tuit data model
 */
 import User from "./User";
/**
* @typedef Tuit Represents Tuit
* @property {ObjectId[]} tuit tuit id  
* @property {ObjectId[]} postedBy user id 
*/
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};