import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import axios from 'axios';

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
]);

function App() {
  const [authToken, setAuthToken] = useState<authTokenType>({accessToken:"", refreshToken:""});

  useEffect(() => {
    if(authToken) {
      setTimeout(() => {
        console.log({authToken});
        
        axios.post('http://localhost:8080/auth/refreshToken', {} ,{headers:{
            authorization: authToken.refreshToken
        }}).then((res) => {
            console.log("refreshed", res.data);
            setAuthToken({accessToken: res.data.accessToken, refreshToken:res.data.refreshToken} );
        }); 
      }, 1000 * 3600 - 10000);
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
