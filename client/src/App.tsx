import { createContext, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';

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
