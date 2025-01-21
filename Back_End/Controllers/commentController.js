import Comment from '../Models/comment.js'; /* importing comment model schema */


/* asynchronous function to add/post comment under a video */

export const addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        const comment = new Comment({ user: req.user._id, video, message });
        await comment.save(); /* save method saves the current comment to the database */
        res.status(201).json({
            message: "success",
            comment
        });

    } catch (error) {
        res.status(500).json({ error: "server error" }); /* error handling  */
    }
}

/* asynchronous function to get a  comment by video id */

export const getCommentByVideoId = async (req, res) => {
    try {
        let { videoId } = req.params;
        const comments = await Comment.find({ video: videoId }).populate('user', 'channelName profilePic userName createdAt');
        /* populate method fetchs only given fields in comment collection and populate into the object */

        res.status(201).json({
            message: "success",
            comments
        });

    } catch (error) {
        res.status(500).json({ error: "server error" }); /* error handling  */
    }
}

/* asynchronous function to delete comment under a video */

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id); /* findinf comment by its Id given by MongoDB */

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" }); /* error handling  */
    }
};

/* asynchronous function to edit/update a comment under a video */

export const editComment = async (req, res) => {
    try {
        const { id } = req.params; /*destructuring to get id property from params as req.params contains route parameters*/
        const { message } = req.body;

        const comment = await Comment.findByIdAndUpdate(
            id,
            { message },
            { new: true } /*returns the updated comment*/
        );

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        res.status(500).json({ error: "Server error" }); /* error handling  */
    }
};

