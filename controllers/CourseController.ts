import CourseControllerI from "../interfaces/CourseController";
import {Express, Request, Response} from "express";
import CourseDao from "../daos/CourseDao";

export default class CourseController implements CourseControllerI {
    constructor(app: Express) {
        app.get("/courses", this.findAllCourses);
        app.get("/courses/:cid", this.findCourseById);
        app.post("/courses", this.createCourse);
        app.put("/courses/:cid", this.updateCourse);
        app.delete("/courses/:cid", this.deleteCourse);
    }
    findAllCourses(req: Request, res: Response): void {
        CourseDao.getInstance().findAllCourses()
            .then(courses => res.json(courses));
    }
    findAllCoursesDeep(req: Request, res: Response): void {
        CourseDao.getInstance().findAllCoursesDeep()
            .then(courses => res.json(courses));
    }
    findCourseById(req: Request, res: Response): void {
        const cid = req.params.cid;
        CourseDao.getInstance().findCourseById(cid)
            .then(course => res.json(course));
    }
    findCourseByIdDeep(req: Request, res: Response): void {
        const cid = req.params.cid;
        CourseDao.getInstance().findCourseByIdDeep(cid)
            .then(course => res.json(course));
    }
    createCourse(req: Request, res: Response): void {
        const course = req.body;
        CourseDao.getInstance().createCourse(course)
            .then(course => res.json(course));
    }
    deleteCourse(req: Request, res: Response): void {
        const cid = req.params.cid;
        CourseDao.getInstance().deleteCourse(cid)
            .then(status => res.send(status));
    }
    updateCourse(req: Request, res: Response): void {
        const cid = req.params.cid;
        const course = req.body;
        CourseDao.getInstance().updateCourse(cid, course)
            .then(status => res.send(status));
    }
    addSectionToCourse(req: Request, res: Response): void {
        const cid = req.params.cid;
        const sid = req.params.sid;
        CourseDao.getInstance().addSectionToCourse(cid, sid)
            .then(status => res.send(status));
    }
    removeSectionFromCourse(req: Request, res: Response): void {
        const cid = req.params.cid;
        const sid = req.params.sid;
        CourseDao.getInstance().removeSectionFromCourse(cid, sid)
            .then(status => res.send(status));
    }
}