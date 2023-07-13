import React from 'react';
import {Route,Routes } from 'react-router-dom';
import './App.css'
import Home from './components/page/Home';
import Insert from './components/page/Insert';
import Edit from './components/page/Edit';
import Login from './components/Login/Login';

function App() {
  
  return (
    

    <Routes >      
       {/* <Route path="/" element={<Login />} /> */}
       <Route path="/" element={<Home />}/>
       <Route path="/insert" element={<Insert />}/>
       <Route path="/edit" element={<Edit />}/>    
      </Routes>

  );
}

export default App;
