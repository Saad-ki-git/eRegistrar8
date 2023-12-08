import React from 'react'
import TextEditor from './TextEditor'
import { getToken } from '../services/LocalStorageService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import CombineEditor from './CombineEditor';

function Home() {
  const { access_token } = getToken()
  const navigate = useNavigate()
  const handleLogin = ()=>{
    navigate('/login')
  }


  return (
    <div>
     
      {access_token ? (
       <div>
        <CombineEditor />
        </div>  // Renders the TextEditor component if access_token exists
      ) : (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#56B93A",// Set initial background color to green
        }}
        onClick={handleLogin} 
        >
          <button onClick={handleLogin} className="bg-black text-white rounded-8 px-6 py-4 text-center font-font-mono  text-3xl transition duration-300 hover:bg-white hover:text-black">
            Please login First!
          </button>
        </div>

      )}
    </div>

  )
}

export default Home