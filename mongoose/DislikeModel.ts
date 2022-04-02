/**
 * @file Implements mongoose model to CRUD
 * documents in the dislike collection
 */
 import mongoose from "mongoose";
 import DislSchema from "./DislikeSchema";
 const DislikeModel = mongoose.model("DislikeModel", DislSchema);
 export default DislikeModel;