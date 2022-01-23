import mongoose from "mongoose";
import CourseSchema from "./CourseSchema";
// import Course from "../../models/Course";
import Course from "./Course";
const CourseModel = mongoose.model<Course>(
    "CourseModel",
    CourseSchema
);
// CourseModel.createCollection({})
export default CourseModel;
