import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
    FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    userFollowsUser = async (uid: string, uidFollowing: string): Promise<any> =>
        FollowModel.create({userFollowed: uid, userFollowing: uidFollowing});
    userUnfollowsUser = async (uid: string, uidFollowing: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: uidFollowing});
}