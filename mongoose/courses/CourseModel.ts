import mongoose from "mongoose";
import CourseSchema from "./CourseSchema";
import Course from "./Course";
const CourseModel = mongoose.model<Course>(
    "CourseModel",
    CourseSchema
);
export default CourseModel;
