import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}
  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }
  async findTuitsByUser(userId: string): Promise<Tuit[]> {
    return await TuitModel.find({author: userId}); //changed
  }
  async findTuitById(tid: string): Promise<any> {
    return await TuitModel.findById(tid).populate("author").exec(); //changed
  }
  async createTuit(uid: string, tuit: Tuit): Promise<any> {
    //changed
    return await TuitModel.create({...tuit, postedBy: uid});
  }
  async deleteTuit(tid: string): Promise<any> {
    return await TuitModel.deleteOne({ _id: tid }); //changed
  }
  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({ _id: tid }, { $set: tuit }); //changed
  }
}
