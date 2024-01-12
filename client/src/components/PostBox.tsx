import { Post } from "./types/postTypes";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './styles/postsPage.css'

interface PostProps {
    post: Post;
    setOpenPost: (post: Post) => void;
}

const PostBox = (props: PostProps) => {
    const { post, setOpenPost } = props;
    const { location, dealType, price, bedrooms, bathrooms, homeType, area, comments } = post;

    return (
        <Card className='postBox' onClick={() =>setOpenPost(post)}>
            <CardMedia 
                className='boxPhoto'
                image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {bedrooms} bds | {bathrooms} ba | {area} sqft - House for {dealType} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {homeType} in {location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Comments: {comments?.length ? comments.join(', ') : "No comments yet"}
                </Typography>
            </CardContent>
    </Card>
    );
};

export default PostBox;