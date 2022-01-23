import {Request, Response} from "express";

export default interface CourseController {
    findAllCourses(req: Request, res: Response): void;
    // findAllCoursesDeep(req: Request, res: Response): void;
    // findCourseById(req: Request, res: Response): void;
    // findCourseByIdDeep(req: Request, res: Response): void;
    // createCourse(req: Request, res: Response): void;
    // deleteCourse(req: Request, res: Response): void;
    // updateCourse(req: Request, res: Response): void;
    // addSectionToCourse(req: Request, res: Response): void;
    // removeSectionFromCourse(req: Request, res: Response): void;
};