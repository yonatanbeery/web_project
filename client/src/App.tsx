import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import axios from 'axios';
import { useCookies } from "react-cookie";
import moment from 'moment';

export type authTokenType = {accessToken:string, refreshToken:string}

export const AuthContext = createContext<{authToken: authTokenType, setAuthToken: any}>(
  {authToken: {accessToken:"", refreshToken:""}, setAuthToken: null});

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
]);

function App() {
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const [authToken, setAuthToken] = useState<authTokenType>({accessToken:cookies.accessToken, refreshToken:cookies.refreshToken});


  useEffect(() => {
    if(authToken.accessToken && authToken.refreshToken) {
      setTimeout(() => {        
        axios.post('http://localhost:8080/auth/refreshToken', {} ,{headers:{
            authorization: authToken.refreshToken
        }}).then((res) => {
            console.log("refreshed", res.data);
            setCookie("accessToken", res.data.accessToken, { path: "/" , expires: moment().add(1, 'h').toDate()});
            setCookie("refreshToken", res.data.refreshToken, { path: "/"});
            setAuthToken({accessToken: res.data.accessToken, refreshToken:res.data.refreshToken} );
        }); 
      }, 3600 * 1000 - 10000);
    }
  }, [authToken])

  return (
    <div>
      <AuthContext.Provider value={{authToken, setAuthToken}}>
        <Navbar /> 
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  )
}

export default App
