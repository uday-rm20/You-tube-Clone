import express from "express";
import { getAllVideo, getAllVideoByUserID, getVideoById, uploadVideo } from "../Controllers/videoController.js";
import { authenticate } from "../middleware/authentication.js";


const router = express.Router();  /* express.Router helps to create new routes  */

router.post('/video', authenticate, uploadVideo); /* defining route for uploading and middlewre is included so only autheticate user can access this route */
router.get('/allvideo', getAllVideo); /* defining route to get all videos */
router.get('/getVideoById/:id', getVideoById); /* defining route to get videos by their Id */
router.get('/:userId/channel', getAllVideoByUserID); /* definig route to get videos of a particualr users */


export default router;