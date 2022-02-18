import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersThatFollowUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
};