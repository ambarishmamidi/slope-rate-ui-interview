// App.js
import React from 'react';

import './App.css';

import Layouts from './components/Layouts/Layouts';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';




const App = () => {
  return (
    <div className=" ">
      {/* <div className=''>
      <Layouts/>
      </div> */}
      {/* <Sapmle/> */}
      {/* <Header/> */}
      <Navbar/>
    </div>
  );
};

export default App;