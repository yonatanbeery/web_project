import { createContext, useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import PostsPage from './components/PostsPage';
import Login from './components/Login';

export const AuthContext = createContext<{authToken: string, setAuthToken: any}>({authToken: "", setAuthToken: null});

function App() {
  const [authToken, setAuthToken] = useState<string>("");

  return (
    <div>
      <AuthContext.Provider value={{authToken, setAuthToken}}>
      <Navbar /> 
      {authToken ? 
        <PostsPage />
        : <Login/>}
        </AuthContext.Provider>
    </div>
  )
}

export default App
