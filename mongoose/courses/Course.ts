import {Types} from "mongoose";

export default interface Course {
    title: string;
    credits?: number;
    syllabus?: string;
    sections?: Types.ObjectId[];
}