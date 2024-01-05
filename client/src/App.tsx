import { useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import Login from './components/Login';

function App() {
  const [auth, setAuth] = useState<Boolean>(false);

  return (
    <>
      <div>
        <Navbar /> 
      </div>
      {auth
        ? <PostsPage />
        : <Login setLogin={(x:Boolean) => setAuth(x)}/>}
    </>
  )
}

export default App
