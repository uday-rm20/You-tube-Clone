import express from "express";
import { addComment, deleteComment, editComment, getCommentByVideoId } from "../Controllers/commentController.js";
import { authenticate } from "../middleware/authentication.js";



const router = express.Router(); /* express.Router helps to create new routes  */


router.post('/comment', authenticate, addComment); /* defining route for comment posting */
router.get('/comment/:videoId', getCommentByVideoId); /* definig route for getting comment by videoId */
router.delete('/comment/:id', authenticate, deleteComment); /* definig route for deleting a comment */
router.put('/comment/:id', authenticate, editComment); /* defining a route for editing/updating a comment */


export default router;