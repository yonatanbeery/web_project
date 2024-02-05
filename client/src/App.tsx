import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/posts/PostsPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import axios from 'axios';
import { useCookies } from "react-cookie";
import moment from 'moment';
import PostEditor from './components/NewPost/NewPostCard';
import { getCities } from './services/citiesService';
import MyPosts from './components/myPosts/MyPosts';

export type authTokenType = {accessToken:string, refreshToken:string, userId: string}

export const AuthContext = createContext<{authToken: authTokenType, setAuthToken: any}>(
  {authToken: {accessToken:"", refreshToken:"", userId: ""}, setAuthToken: null});
export const CitiesContext = createContext<{cities: string[]}>({cities: []});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/MyPosts",
    element: <MyPosts />,
  },
  {
    path: "/NewPost",
    element: <PostEditor />,
  },
]);

function App() {
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken", "userId"]);
  const [authToken, setAuthToken] = useState<authTokenType>({accessToken:cookies.accessToken, userId: cookies.userId, refreshToken:cookies.refreshToken});
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if(authToken.accessToken && authToken.refreshToken) {
      setTimeout(() => {        
        axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/refreshToken`, {} ,{headers:{
            authorization: authToken.refreshToken
        }}).then((res) => {
            console.log("refreshed", res.data);
            setCookie("accessToken", res.data.accessToken, { path: "/" , expires: moment().add(1, 'h').toDate()});
            setCookie("refreshToken", res.data.refreshToken, { path: "/"});
            setAuthToken({accessToken: res.data.accessToken, refreshToken:res.data.refreshToken, userId:res.data.userId} );
        }); 
      }, 3600 * 1000 - 10000);
    }
  }, [authToken])

  useEffect(() => {fetchCities()}, []);

  const fetchCities = async () => {
    try {
        const response = await getCities();
        response && setCities((response.data.result.records.map((location: { [x: string]: any; }) => location['שם_ישוב_לועזי']))); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return (
    <div>
      <AuthContext.Provider value={{authToken, setAuthToken}}>
        <CitiesContext.Provider value={{cities}}>
          <Navbar /> 
          <RouterProvider router={router} />
        </CitiesContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
