import { useContext } from "react";
import { AuthContext } from "../../App";
import PostsPage from "../posts/PostsPage";


const MyPosts = () => {
    const {authToken} = useContext(AuthContext);

    return <PostsPage userId={authToken.userId}/>
};

export default MyPosts;