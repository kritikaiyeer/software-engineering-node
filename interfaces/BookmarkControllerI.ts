import {Request, Response} from "express";

export default interface BookmarkController {
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
};