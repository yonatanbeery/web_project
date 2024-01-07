import Filters from "./filters/FIlters"
import {  useContext, useEffect, useState } from 'react';
import PostBox from "./PostBox";
import { Post } from "./types/postTypes";
import './styles/postsPage.css'
import { getPosts } from "../services/postsService";
import { Typography } from "@mui/material";
import { FiltersOptions } from "./filters/filtersTypes";
import {AuthContext} from "../App";
import Login from "./Login";

const PostsPage = (filtersProp: FiltersOptions) => {
    const {authToken} = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState<FiltersOptions>({
        location: filtersProp.location,
        dealType: filtersProp.dealType,
        price: filtersProp.price,
        bedrooms: filtersProp.bedrooms,
        bathrooms: filtersProp.bathrooms,
        homeType: filtersProp.homeType

        // const [filters, setFilters] = useState<FiltersOptions>(Object.keys(filtersProp).length ? filtersProp : {
        //     location: null,
        //     dealType: null,
        //     price: {minPrice: null, maxPrice: null},
        //     minBedrooms: null,
        //     minBathrooms: null,
        //     homeType: null
    });
    
    useEffect(() => {fetchPosts();}, []);

    const fetchPosts = async () => {
        try {
            const response = await getPosts(filters);
            response && setPosts(response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        authToken 
            ? <>
                <Filters {...{ filters, setFilters, getPosts: fetchPosts }}  />
                <div className='postBoxes'>
                    {posts.length
                        ? posts.map((post: Post) => <PostBox  {...post} />) 
                        : <Typography className="noResults" variant="h4" color="text.secondary">
                            We couldn't find a property that matches your search... <br />
                            Please try to modify your selections.
                        </Typography>
                    }
                </div>
            </>
            :  <Login/>

    );
};

export default PostsPage;