import React from 'react';
import {Route,Routes } from 'react-router-dom';
import './App.css'
import Home from './components/page/Home';
import Search from './components/page/Search';
import Edit from './components/page/Edit';


function App() {
  
  return (
    <Routes >      
       {/* <Route path="/" element={<Login />} /> */}
       {/* <Route path="/" element={<Home2/>}/> */}
       <Route path="/" element={<Home />}/>
       <Route path="/search" element={<Search/>}/>
       <Route path="/edit" element={<Edit />}/>    
      </Routes>
  );
}

export default App;
