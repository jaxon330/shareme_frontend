import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Login from './components/Login';
import { fetchUser } from './utils/fetchUser';
import { gapi } from 'gapi-script';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        ClientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)}, [])

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login');
  }, [])
  
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>

  )
}

export default App