import mongoose from "mongoose";
// import Course from "../../models/Course";
import Course from "./Course";
// const CourseSchema = new mongoose.Schema();
// CourseSchema.loadClass(Course);
const CourseSchema = new mongoose.Schema<Course>({
    title: String,
    credits: Number,
    syllabus: String,
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SectionModel"
    }]
}, {collection: "courses"});
export default CourseSchema;