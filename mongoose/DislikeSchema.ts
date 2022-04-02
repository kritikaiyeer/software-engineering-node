import mongoose, {Schema} from "mongoose";
import Dislikes from "../models/Dislikes";

const DislikeSchema = new mongoose.Schema<Dislikes>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;