import Video from "../Models/video.js"; /* importing Video Model Schema */


/* Asynchronous function to add/post a video to database */

export const uploadVideo = async(req,res) => {
    try{
        const { title, description, videoLink, videoType, thumbnail } = req.body;
        console.log(req.user);
        const videoUpload = new Video({user: req.user._id, title, description, videoLink, videoType, thumbnail });
        await videoUpload.save(); /* save the video with all the details entered to the database */

        res.status(201).json({success: "true", videoUpload });

    }catch(error){
        res.status(500).json({error: "server error"});/* error handling */
    }

}

/*Asynchronous function to get all videos in the DB  */

export const getAllVideo = async (req, res) => {
    try{
        const videos = await Video.find().populate('user', 'channelName profilePic userName createdAt' ); /* it returns all the videos in the DB */
        res.status(201).json({success: "true", "videos": videos});

    }catch(error){
        res.status(500).json({error: "server error"}); /* error handling */
    }
}

/* Asynchronous function to get a video by its ObjectId  */

export const getVideoById = async (req, res) => {
    try{
        let {id} = req.params;
        const video = await Video.findById(id).populate('user', 'channelName profilePic userName createdAt' );
        res.status(201).json({ success: "true", "video": video});
        

    }catch(error){
        res.status(500).json({error: "server error"}); /* error handling */

    }
}

/* Asynchronous function to get all videos by a particular user */
export const getAllVideoByUserID = async(req,res)=>{
    try{

        let {userId} = req.params;
        /*it returns all videos under a registered user has uploaded*/

        const video = await Video.find({user:userId}).populate('user', 'channelName profilePic userName createdAt about' );
        res.status(201).json({ success: "true", "video": video});

    }catch(error){
        res.status(500).json({error: "server error"});/* error handling  */
    }

}