import mongoose from "mongoose";


/* defining the schema/structure of video to be followed */

const videoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    videoLink:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    videoType:{
        type:String,
        default: "All"
    },
    like:{
        type:Number,
        default: 0
    },
    disLike:{
        type:Number,
        default: 0
    }

}, {timestamps:true})

const Video = mongoose.model("video", videoSchema); /* applying video schema to the collection  */

export default Video;