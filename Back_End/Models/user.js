import mongoose from "mongoose";


/* defining the schema/structure of user to be followed */

const userSchema = new mongoose.Schema({
    channelName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true, /* unique per user */
    },
    password:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        required:true,
    }
}, {timestamps:true})

const User = mongoose.model("user", userSchema); /* applying model schema to the collection  */

export default User;