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
      app.get("/api/users/:uid/tuits",TuitController.tuitController.findTuitsByUser); //doesnt work
      app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById); //not
      app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit); //works
      app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit); //doesnt work
      app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit); // not
    }
    return TuitController.tuitController;
  };

  private constructor() {}

  findAllTuits = (req: Request, res: Response) =>
    TuitController.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
  findTuitById = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitById(req.params.uid)
      .then((tuit:Tuit) => res.json(tuit));
  findTuitsByUser = (req: Request, res: Response) =>
    TuitController.tuitDao
      .findTuitsByUser(req.params.uid)
      .then((tuits: Tuit[]) => res.json(tuits));
  createTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.createTuit(req.params.uid, req.body).then((tuit: Tuit) =>  res.json(tuit));
  deleteTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .deleteTuit(req.params.uid)
      .then((status) => res.json(status));
  updateTuit = (req: Request, res: Response) =>
    TuitController.tuitDao
      .updateTuit(req.params.uid, req.body)
      .then((status) => res.json(status));
}
