import { Post } from "../types/postTypes";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/postsPage.css'
import { Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

interface PostProps {
    post: Post;
    setOpenPost: (post: Post) => void;
    photo: {title: string, src: string};
    isEditable: boolean;
}

const PostBox = (props: PostProps & {setEditedPost: any}) => {
    const { post, setOpenPost, photo, isEditable, setEditedPost} = props;
    const { location, dealType, price, bedrooms, bathrooms, homeType, area, comments } = post;

    return (
        <Box>
            <Card className='postBox' style={{ justifyContent: "space-between"}}> 
            <Box onClick={() =>setOpenPost(post)}>
                <div style={{height: "150px", display: 'flex', justifyContent: "center", alignItems: 'center'}}>
                    {photo
                        ? <img key={photo.title} src={photo.src} alt={photo.title} style={{display: 'flex', width: '100%', height: '100%', justifyContent: "space-between"}}/>
                        : <Typography variant="h5" color="text.secondary">
                            No photos for this post
                        </Typography>}
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {bedrooms} bds | {bathrooms} ba | {area} sqft - {homeType} for {dealType} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {homeType} in {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        Comments: {comments?.length ? comments.join(', ') : "No comments yet"}
                    </Typography>
                </CardContent>
                </Box>
                {isEditable && <Button sx={{minWidth:"100%"}} onClick={() => setEditedPost(post)}><EditIcon/></Button>}
        </Card>
    </Box>
    );
};

export default PostBox;