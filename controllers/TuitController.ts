import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import TuitControllerI from "../interfaces/TuitController";
export default class TuitController implements TuitControllerI {
  private static tuitDao: TuitDao = TuitDao.getInstance();
  private static tuitController: TuitController | null = null;
  public static getInstance = (app: Express): TuitController => {
    if (TuitController.tuitController === null) {
      TuitController.tuitController = new TuitController();
      app.get("/api/hello", (req, res) => res.send("This is tuiter"));
      app.get("/api/tuits", TuitController.tuitController.findAllTuits);
      app.get(
        "/users/:uid/tuits",
        TuitController.tuitController.findTuitsByUser
      );
      app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
      app.post("/api/tuits", TuitController.tuitController.createTuit);
      app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
      app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
    }
    return TuitController.tuitController;
  };

  private constructor() {}

  findAllTuits = (req: Request, res: Response) =>
    TuitController.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
  findTuitById = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitById(req.params.userid)
      .then((tid) => res.json(tid));
  findTuitsByUser = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitsByUser(req.params.userid)
      .then((userid) => res.json(userid));
  createTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.createTuit(req.params.uid, req.body).then((tuit: Tuit) =>  res.json(tuit));
  deleteTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .deleteTuit(req.params.userid)
      .then((status) => res.json(status));
  updateTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .updateTuit(req.params.userid, req.body)
      .then((status) => res.json(status));
}
