import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { Photos } from "./Photos";
import { Messages } from './Messages';
import { Memories } from './Memories';

import './App.css';

const PageNotFound = () => <div>
  Something went wrong
  </div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/photos" element={<Photos  />} />
      <Route path="/messages" element={<Messages  />} />
      <Route path="/memories" element={<Memories  />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
