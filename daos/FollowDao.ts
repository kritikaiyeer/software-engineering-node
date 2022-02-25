/**
 * @file Implements DAO managing data storage of follow. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
/**
  * @class FollowDao Implements Data Access Object managing data storage
  * of follow
  * @property {FollowDao} followDao Private single instance of UserDao
  */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    /**
      * Retrieves all users that follow a particular user
      * @param {String} uid uid representing user
    **/
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    /**
      * Retrieves all users followed by user from the database
      * @param {String} uid user liked the tuits
    */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
    FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    /**
      * @param {Request} uid user id
      * @param {Response} uidFollowing user id following
    */
    userFollowsUser = async (uid: string, uidFollowing: string): Promise<any> =>
        FollowModel.create({userFollowed: uid, userFollowing: uidFollowing});
    userUnfollowsUser = async (uid: string, uidFollowing: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: uidFollowing});
}