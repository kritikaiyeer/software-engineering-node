/**
 * @file Implements Tuit data model
 */
 import User from "./User";
 import Stats from "./Stats";

/**
* @typedef Tuit Represents Tuit
* @property {ObjectId[]} tuit tuit id  
* @property {ObjectId[]} postedBy user id 
*/
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};