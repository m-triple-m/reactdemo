import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Location from './components/Location.jsx';
import DragMath from './components/DragMath.jsx';
import './App.css';

const App = () => {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticated/:githubusername" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/dragmath" element={<DragMath />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;