import { useContext } from "react";
import { AuthContext } from "../../App";
import PostsPage from "../posts/PostsPage";


const MyPosts = () => {

    return <PostsPage isUsersPosts={true}/>
};

export default MyPosts;