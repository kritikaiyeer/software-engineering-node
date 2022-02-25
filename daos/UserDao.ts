/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * Implements Data Access Object managing data storage
 * of Users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}
    /**
      * Retrieves all users from the database and returns an array of users.
      */
    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();
    /**
      * Retrieves user object from the database for a particular user id and returns
      * a user object.
      * @param {String} uid user id
      */
    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);
    /** 
     * Create user
      * @param {User} user user object
      */
    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);
    /** Update user
      * @param {String} uid user id
      * @param {User} user user object
      */
    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid},
            {$set: user});
    /** Delete the user
      * @param {String} uid user id
    **/
    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});
};