import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import { KirjauduSisään } from './components/KirjauduSisään';
import { Home } from './components/Home';
import { LuoKäyttäjä } from './components/LuoKäyttäjä';
import EkaVisualisointi from './components/EkaVisualisointi';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/kirjaudu' element={<KirjauduSisään />} />
      <Route path='/luokayttaja' element={<LuoKäyttäjä />} />
      <Route path='/1Visualisointi' element={<EkaVisualisointi />} />
    </Routes>
    </>
  );
}

export default App;
