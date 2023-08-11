import React from 'react';
import {Route,Routes } from 'react-router-dom';
import './App.css'
import Home from './components/page/Home';
import Search from './components/page/Search';
import Edit from './components/page/Edit';
import Login from './components/Login/Login';
import Home2 from './components/page/Home2';

function App() {
  
  return (
    <Routes >      
       {/* <Route path="/" element={<Login />} /> */}
       <Route path="/" element={<Home2/>}/>
       <Route path="/home" element={<Home />}/>
       <Route path="/search" element={<Search/>}/>
       <Route path="/edit" element={<Edit />}/>    
      </Routes>
  );
}

export default App;
