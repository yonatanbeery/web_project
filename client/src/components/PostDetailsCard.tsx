import { Post } from "./types/postTypes";
import Dialog from '@mui/material/Dialog';
import { Button, IconButton, Popover, TextField, Typography } from "@mui/material";
import PostDetail from "./PostDetail";
import { MouseEvent, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { postComment } from "../services/postsService";

interface PostDetailsCardProps {
    openPost: Post;
    setOpenPost: (post: Post | null) => void;
    onCommentAdded: (newComment: string) => void;
}

const PostDetailsCard = (props: PostDetailsCardProps) => {
    const { openPost, setOpenPost, onCommentAdded } = props;
    const { _id, photos, location, dealType, price, bedrooms, bathrooms, homeType, area, comments, contactDetails, freeText } = openPost;
    const [ currentComments, setCurrentComments ] = useState(comments);
    const [ newComment, setNewComment ] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const commentRef = useRef<HTMLInputElement | null>(null);
    const openContactDetails = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        await postComment(_id, newComment)
        if (commentRef.current) commentRef.current.value = '';
        setCurrentComments(prevComments => prevComments  ? [...prevComments, newComment] : [newComment]);
        setNewComment('');
        onCommentAdded(newComment);
    } 

    return (
        <div>
            <Dialog onClose={() => setOpenPost(null)} open fullWidth maxWidth="md" sx={{ '& .MuiPaper-root': { borderRadius: '20px', padding: '20px'  } }}>
                <div style={{height: "400px"}}>
                    {photos?.length
                        ? <img src={photos[0]}/>
                        :   <Typography variant="h4" color="text.secondary" sx={{textAlign: "center", marginTop: "180px"}}>
                                No photos for this post
                            </Typography>
                    }
                </div>
                <div style={{display: "flex", height: "250px"}}>
                    <div style={{width: "70%"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <PostDetail 
                                primaryText={price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"$"}
                                secondaryText={`${homeType} in ${location} for ${dealType}`}
                            />
                            <PostDetail 
                                primaryText={bedrooms}
                                secondaryText="beds"
                            />
                            <PostDetail 
                                primaryText={bathrooms}
                                secondaryText="baths"
                            />
                            <PostDetail 
                                primaryText={area}
                                secondaryText="sqft"
                            />
                        </div>
                        <Typography variant="subtitle1">
                            {freeText}
                        </Typography>
                    </div>
                    <div style={{borderLeft: "1px solid grey", height: "90%"}}></div>
                    <div style={{width: "30%", marginLeft: "20px"}}>
                        <Button variant="contained" onClick={handleClick} sx={{margin: "auto", marginBottom: "12px", display: "block"}}>Contact details</Button>
                        <Popover
                            open={openContactDetails}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            
                            <div style={{padding: "20px"}}>
                                <PostDetail primaryText={contactDetails?.name} secondaryText={"Name:"} secondaryHeader />
                                <PostDetail primaryText={contactDetails?.phoneNumber} secondaryText={"Phone number:"} secondaryHeader />
                                <PostDetail primaryText={contactDetails?.EmailAddress} secondaryText={"Email:"} secondaryHeader />
                            </div>
                        </Popover>
                        <>
                            <Typography variant="subtitle1">
                                comments:
                            </Typography>
                            <div style={{overflow: "auto", height: "120px"}}>
                                {currentComments?.length
                                    ? currentComments?.map(comment => 
                                        <>
                                            <Typography variant="subtitle1" sx={{margin: "0"}}>
                                                {comment}
                                            </Typography>
                                            <hr />
                                        </>)
                                    : <Typography color="text.secondary" sx={{textAlign: "center", marginTop: "40px"}}>
                                        No comments yet
                                    </Typography>    
                                    }
                            </div>
                        </>
                        <div style={{display: "flex"}}>
                        <TextField inputRef={commentRef} variant="standard" sx={{margin: "auto", display: "block"}} label="Add your comment here" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewComment(event.target.value)} />
                        <IconButton onClick={handlePostComment}>
                            <SendIcon />
                        </IconButton>
                        </div>
                        
                    </div>
                </div>
            </Dialog>
        </ div>
    );
}

export default PostDetailsCard;