import { useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import Login from './components/Login';

function App() {
const  [auth, setAuth] = useState(true);

  return (
    <>
      <div>
        <Navbar /> 
      </div>
      {auth
        ? <PostsPage />
        : <Login />}
    </>
  )
}

export default App
