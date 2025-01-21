import React, { useState, useEffect } from "react";
import './video.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedMessage, setEditedMessage] = useState("");


    const fetchVideoById = async () => {
        await axios.get(`http://localhost:5100/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video);
            setData(response.data.video);
            setVideoURL(response.data?.video?.videoLink)

        }).catch(err => {
            console.log(err);
        })
    }

    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:5100/commentApi/comment/${id}`).then((response) => {
            console.log(response);
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();

    }, [])

    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        }
        await axios.post(`http://localhost:5100/commentApi/comment`, body, { withCredentials: true }).then((response) => {
            console.log(response);
            const newComment = response.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        }).catch(err => {
            toast.error("Please Login First to comment")
        })
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5100/commentApi/comment/${commentId}`, { withCredentials: true });
            setComments(comments.filter((comment) => comment._id !== commentId));
            toast.success("Comment deleted successfully");
        } catch (err) {
            toast.error("Please Log In to delete a comment");
            console.error(err);
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            const body = { message: editedMessage };

            const response = await axios.put(
                `http://localhost:5100/commentApi/comment/${commentId}`,
                body,
                { withCredentials: true }
            );

            setComments(
                comments.map((comment) =>
                    comment._id === commentId ? response.data.comment : comment
                )
            );

            setEditingCommentId(null);
            setEditedMessage("");
            toast.success("Comment edited successfully");
        } catch (err) {
            toast.error("Please Log In to edit your comment");
            console.error(err);
        }
    };


    return (
        <div className="video">
            <div className="videoPostSection">
                <div className="video_youtube">
                    {
                        data && <video
                            width="400"
                            controls
                            autoPlay
                            muted
                            className="video_youtube_video"
                        >
                            <source
                                src={videoUrl}
                                type="video/mp4"
                            />
                            <source
                                src={videoUrl}
                                type="video/webm"
                            />
                            Your Browser does not support the video tag.
                        </video>
                    }
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_youtubeTitle">{data?.title}</div>
                    <div className="youtube_video_profileBlock">
                        <div className="youtube_video_profileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_profileBlock_left_img">
                                <img className="youtube_video_profileBlock_left_image" src={data?.user?.profilePic} />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="youtubesubscribeButton">Subscribe</div>
                        </div>
                        <div className="youtube_video_likebutton">
                            <div className="youtube_video_likebutton_like">
                                <ThumbUpIcon />
                                <div className="youtube_like_count">{data?.like}</div>
                            </div>
                            <div className="divider"></div>
                            <div className="youtube_video_likebutton_like">
                                <ThumbDownIcon />
                                <div className="youtube_like_count">{0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtube_description">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>

                    <div className="youtube_commentSection">
                        <div className="youtube_commentSection_Title">{comments.length} Comments</div>
                        <div className="youtube_selfComment">
                            <img className="youtube_selfComment_profilePic" src="https://yt3.ggpht.com/f_cHcSywRfXfmAPJRCtRGyIXfXpL8_s94AVAkvRddf1v8QwDZdNlRcw3E078saoGx0ixDuHC=s88-c-k-c0x00ffffff-no-rj" />
                            <div className="add_comment">
                                <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} className="add_comment_text" placeholder="Add a commnet" />
                                <div className="cancelandcomment">
                                    <div className="cancelcomment">Cancel</div>
                                    <div className="cancelcomment" onClick={handleComment}>Comment</div>
                                </div>
                            </div>
                        </div>
                        <div className="othercomment">

                            {
                                comments.map((item) => {
                                    return (
                                        <div key={item._id} className="youtube_selfComment">
                                            <img className="youtube_selfComment_profilePic" src={item?.user?.profilePic} />
                                            <div className="othercomment_Section">
                                                <div className="othercomment_header">
                                                    <div className="channelName">{item?.user?.channelName}</div>
                                                    <div className="commenttiming">{item?.createdAt.slice(0, 10)}</div>
                                                </div>

                                                {editingCommentId === item._id ? (
                                                    <div className="editCommentSection">
                                                        <input
                                                            type="text"
                                                            value={editedMessage}
                                                            onChange={(e) => setEditedMessage(e.target.value)}
                                                            className="editCommentInput"
                                                        />
                                                        <button
                                                            className="saveCommentButton"
                                                            onClick={() => handleEditComment(item._id)}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="cancelCommentButton"
                                                            onClick={() => setEditingCommentId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="other_comment_text">{item?.message}</div>
                                                        <button
                                                            className="editCommentButton"
                                                            onClick={() => {
                                                                setEditingCommentId(item._id);
                                                                setEditedMessage(item.message);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </>

                                                )}
                                                <button
                                                    className="deleteCommentButton"
                                                    onClick={() => handleDeleteComment(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>
                    </div>


                </div>

            </div>
            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Nature01</div>
                        <div className="video_about_profile">Channel01</div>
                        <div className="video_about_profile">2k views 6 day ago</div>
                    </div>
                </div>
                <br />
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://rukminim2.flixcart.com/image/850/1000/kgsb1jk0-0/poster/n/h/y/medium-twfnp2-beautiful-waterfall-nature-view-large-size-high-original-imafwy37qv2b5g3v.jpeg?q=20&crop=false" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Nature02</div>
                        <div className="video_about_profile">Channel02</div>
                        <div className="video_about_profile">6k views  16 day ago</div>
                    </div>
                </div>
                <br />
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6hz-ukfdSiFbQG2snc-kF9Zd03tPeTyKisg&s" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Anime01</div>
                        <div className="video_about_profile">Channel03</div>
                        <div className="video_about_profile">3.4k views 1 month ago</div>
                    </div>
                </div>
                <br />
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/039/210/128/small_2x/ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Nature03</div>
                        <div className="video_about_profile">Channel04</div>
                        <div className="video_about_profile">13k views 2 months ago</div>
                    </div>
                </div>
                <br />
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/06/luffy-from-one-piece-goku-from-dragon-ball-z-and-saitama-from-one-punch-man.jpg" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Anime02</div>
                        <div className="video_about_profile">Channel05</div>
                        <div className="video_about_profile">1k views  5 day ago</div>
                    </div>
                </div>
                <br />
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://static.toiimg.com/thumb/msid-110342489,width-1070,height-580,imgsize-49838,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="thumbnail image" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggetion_About">
                        <div className="video_suggetion_About_Title">Anime03</div>
                        <div className="video_about_profile">Channel06</div>
                        <div className="video_about_profile">4k views 11 day ago</div>
                    </div>
                </div>
            </div>

            <ToastContainer />

        </div>
    );
};

export default Video;
