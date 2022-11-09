import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import { KirjauduSisään } from './components/KirjauduSisään';
import { Home } from './components/Home';

function App() {
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/kirjaudu' element={<KirjauduSisään />} />
    </Routes>
    </>
  );
}

export default App;
