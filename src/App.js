import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import { KirjauduSisään } from './components/KirjauduSisään';
import { Home } from './components/Home';
import  Tieto  from './components/tieto'
import { LuoKäyttäjä } from './components/LuoKäyttäjä';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/kirjaudu' element={<KirjauduSisään />} />
      <Route path='/tieto' element={<Tieto />} />
      <Route path='/luokayttaja' element={<LuoKäyttäjä />} />
    </Routes>
    </>
  );
}

export default App;
