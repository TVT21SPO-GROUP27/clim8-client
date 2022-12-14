import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import { KirjauduSisään } from './components/KirjauduSisään';
import { Home } from './components/Home';
import { LuoKäyttäjä } from './components/LuoKäyttäjä';
import EkaVisualisointi from './components/EkaVisualisointi';
import KolmasVisualisointi from './components/KolmasVisualisointi';
import VitosVisualisointi from './components/VitosVisualisointi';
import KuudesVisualisointi from './components/KuudesVisualisointi';
import SeitsemäsVisualisointi from './components/SeitsemäsVisualisointi';
import Visualisointi8 from './components/Visualisointi8';
import Visualisointi9 from './components/Visualisointi9';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/kirjaudu' element={<KirjauduSisään />} />
      <Route path='/luokayttaja' element={<LuoKäyttäjä />} />
      <Route path='/1Visualisointi' element={<EkaVisualisointi />} />
      <Route path='/3Visualisointi' element={ <KolmasVisualisointi /> } />
      <Route path='/5Visualisointi' element= { <VitosVisualisointi />} />
      <Route path='/6Visualisointi' element= { <KuudesVisualisointi />} />
      <Route path='/7Visualisointi' element= { <SeitsemäsVisualisointi />} />
      <Route path='/8Visualisointi' element= { <Visualisointi8 />} />
      <Route path='/9Visualisointi' element= { <Visualisointi9 />} />

    </Routes>
    </>
  );
}

export default App;
