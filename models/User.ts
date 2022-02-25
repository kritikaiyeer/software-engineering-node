/**
 * @file Implements User model
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";
/**
* @typedef User Represents User
* @property {String} username username of the user
* @property {String} password password of user
* @property {String} firstName firstName of the user
* @property {String} lastName password of user
* @property {String} email email of user
* @property {String} profilePhoto profile photo
* @property {String} headerImage header image
* @property {String} biography bio
* @property {Date} dateOfBirth date of birth
* @property {String} accountType account type
* @property {String} maritalStatus marital status
* @property {Number} location latitude and longitude
* @property {Number} salary salary
*/
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};