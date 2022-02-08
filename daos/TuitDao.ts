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
  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({ postedBy: uid }); //changed
  }
  async findTuitById(uid: string): Promise<any> {
    return await TuitModel.findById(uid).populate("postedBy").exec(); //changed
  }
  async createTuit(uid: string, tuit: Tuit): Promise<any> {
    //changed
    return await TuitModel.create({ ...tuit, postedBy: uid });
  }
  async deleteTuit(uid: string): Promise<any> {
    return await TuitModel.deleteOne({ postedBy: uid }); //changed
  }
  async updateTuit(uid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({ postedBy: uid }, { $set: tuit }); //changed
  }
}
