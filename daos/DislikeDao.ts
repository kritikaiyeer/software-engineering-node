import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";
import Dislikes from "../models/Dislikes";
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislikes[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislikes[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    countHowManyDisLikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}