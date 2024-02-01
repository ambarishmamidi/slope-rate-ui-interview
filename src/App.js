// App.js
import React from 'react';

import './App.css';


import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer';



const App = () => {
  return (
    <div className="app-container">
      {/* <div className=''>
      <Layouts/>
      </div> */}
      {/* <Sapmle/> */}
      {/* <Header/> */}
      <Navbar/>
      <Footer/>
    </div>
  );
};

export default App;