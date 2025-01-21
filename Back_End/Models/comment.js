import mongoose from "mongoose";

/* defining the schema/structure of comment to be followed */

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true, /* required field  */
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
        required:true,
    },
    message:{
        type:String,
        required:true,
    }

}, {timestamps:true})

const Comment = mongoose.model("Comment", commentSchema); /* applying comment schema to the collection  */

export default Comment;

