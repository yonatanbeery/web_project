import { createContext, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';

export const AuthContext = createContext<{authToken: string, setAuthToken: any}>({authToken: "", setAuthToken: null});

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
  const [authToken, setAuthToken] = useState<string>("");

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
