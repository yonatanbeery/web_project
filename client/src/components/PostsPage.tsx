import Filters from "./filters/FIlters"
import {  useContext, useEffect, useState } from 'react';
import PostBox from "./PostBox";
import { Post } from "./types/postTypes";
import './styles/postsPage.css'
import { Photo, getPosts } from "../services/postsService";
import { Typography } from "@mui/material";
import { FiltersOptions } from "./filters/filtersTypes";
import {AuthContext} from "../App";
import Login from "./Login";
import PostDetailsCard from "./PostDetailsCard";
import { Buffer } from 'buffer';

const PostsPage = (filtersProp: FiltersOptions) => {
    const {authToken} = useContext(AuthContext);
    const [posts, setPosts] = useState<Post []>([]);
    const [openPost, setOpenPost] = useState<Post | null>();
    const [filters, setFilters] = useState<FiltersOptions>({
        location: filtersProp.location,
        dealType: filtersProp.dealType,
        price: filtersProp.price,
        bedrooms: filtersProp.bedrooms,
        bathrooms: filtersProp.bathrooms,
        homeType: filtersProp.homeType
    });
    
    const onCommentAdded = async (newComment: string) => {
        openPost && setPosts((prevPosts: Post[]) => prevPosts?.map((post) => (post._id === openPost._id ? {...openPost, comments: openPost.comments?.concat([newComment])} : post)) || []);
    }

    useEffect(() => {
        if (authToken) {
            fetchPosts();
        }
    }, [authToken]);  

    const fetchPosts = async () => {
        try {
            const response = await getPosts(filters, authToken.accessToken);
            const costumPosts : Post[] = response?.data.map((post: Post) => ({
                ...post,
                photos: post.photos.map((photo: Photo) => {
                    const img = document.createElement("img");
                    const dataUrl = `data:image/${photo.fileName.split('.').pop()};base64,${Buffer.from(photo.fileData).toString('base64')}`;
                    img.src = dataUrl;
                    img.title = photo.fileName;
                    return img;
                })
            }))
            setPosts(costumPosts); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        authToken.accessToken
            ? <>
                <Filters {...{ filters, setFilters, getPosts: fetchPosts }}  />
                <div className='postBoxes'>
                    {posts && posts.length
                        ? posts.map((post: Post) => <PostBox  {...{post, setOpenPost, photo: post.photos.length ? post.photos[0] : null}} />) 
                        : <Typography className="noResults" variant="h4" color="text.secondary">
                            We couldn't find a property that matches your search... <br />
                            Please try to modify your selections.
                        </Typography>
                    }
                </div>
                {openPost && 
                    <>
                        <PostDetailsCard {...{openPost, setOpenPost, onCommentAdded}} />
                    </>
                }
            </>
            :  <Login/>

    );
};

export default PostsPage;