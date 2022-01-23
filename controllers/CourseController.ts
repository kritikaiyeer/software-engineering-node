import CourseControllerI from "../interfaces/CourseController";
import {Express, Request, Response} from "express";
import CourseDao from "../daos/CourseDao";

export default class CourseController implements CourseControllerI {
    private courseDao = CourseDao.getInstance();
    constructor(app: Express) {
        app.get("/courses", this.findAllCourses);
        // app.get("/courses/:cid", this.findCourseById);
        // app.post("/courses", this.createCourse);
        // app.put("/courses/:cid", this.updateCourse);
        // app.delete("/courses/:cid", this.deleteCourse);
    }
    findAllCourses(req: Request, res: Response): void {
        this.courseDao.findAllCourses()
            .then(courses => res.json(courses));
    }
    // findAllCoursesDeep(req: Request, res: Response): void {
    //     this.courseDao.findAllCoursesDeep()
    //         .then(courses => res.json(courses));
    // }
    // findCourseById(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     this.courseDao.findCourseById(cid)
    //         .then(course => res.json(course));
    // }
    // findCourseByIdDeep(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     this.courseDao.findCourseByIdDeep(cid)
    //         .then(course => res.json(course));
    // }
    // createCourse(req: Request, res: Response): void {
    //     const course = req.body;
    //     this.courseDao.createCourse(course)
    //         .then(course => res.json(course));
    // }
    // deleteCourse(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     this.courseDao.deleteCourse(cid)
    //         .then(status => res.send(status));
    // }
    // updateCourse(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     const course = req.body;
    //     this.courseDao.updateCourse(cid, course)
    //         .then(status => res.send(status));
    // }
    // addSectionToCourse(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     const sid = req.params.sid;
    //     this.courseDao.addSectionToCourse(cid, sid)
    //         .then(status => res.send(status));
    // }
    // removeSectionFromCourse(req: Request, res: Response): void {
    //     const cid = req.params.cid;
    //     const sid = req.params.sid;
    //     this.courseDao.removeSectionFromCourse(cid, sid)
    //         .then(status => res.send(status));
    // }
}