/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
 import TuitModel from "../mongoose/TuitModel";
 import Tuit from "../models/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class TuitDao implements TuitDaoI{
     private static tuitDao: TuitDao | null = null;
     public static getInstance = (): TuitDao => {
         if(TuitDao.tuitDao === null) {
             TuitDao.tuitDao = new TuitDao();
         }
         return TuitDao.tuitDao;
     }
     private constructor() {}
     /**
      * Retrieves all tuits from the database and returns an array of tuits.
      */
     findAllTuits = async (): Promise<Tuit[]> =>
         TuitModel.find();
     /**
      * Retrieves all tuits from the database for a particular user and returns
      * an array of tuits.
      * @param {String} uid user id
      */
     findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
         TuitModel.find({postedBy: uid});
     /**
      * Retrieves all tuits from the database for a particular tuit id and returns
      * an array of tuits.
      * @param {String} uid tuit id
      */
     findTuitById = async (uid: string): Promise<any> =>
         TuitModel.findById(uid)
             .populate("postedBy")
             .exec();
      /**
      * @param {String} uid user id
      * @param {Tuit} tuit tuit json body
      */
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
         TuitModel.create({...tuit, postedBy: uid});
     /**
      * @param {String} uid user id
      * @param {Tuit} tuit tuit json body
      */
     updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
         TuitModel.updateOne(
             {_id: uid},
             {$set: tuit});
     /**
      * @param {String} uid user id
      */
     deleteTuit = async (uid: string): Promise<any> =>
         TuitModel.deleteOne({_id: uid});
 }