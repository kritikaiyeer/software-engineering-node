import {Request, Response} from "express";
/**
 * @file Implements BookmarkController interface
 */
export default interface BookmarkController {
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
};