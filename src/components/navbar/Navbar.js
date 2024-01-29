import React, { useState } from 'react'
import logo from '../../assests/slope rate.jpeg'
import { Link, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import './Navbar.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom'
import BookingPage from '../BookingPage'
import QuizPage from '../QuizPage'
import Match from '../matches/Match'
import Squads from '../Squad/Squads'
import Home from '../Home/Home'
import LiveScore from '../LiveScore/LiveScore'
import RegistrationForm from '../RegisterationForm'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
  
  return (
    
    <BrowserRouter>
    <nav className='bg-blue-400 p-2 w-full'>
    <div className='item flex items-center justify-between '>
        <div className='flex justify-between items-center'>
      <div className='flex  items-center '>
        <Link to='/'><img src={logo} alt='' className='rounded-md w-24 h-12 cursor-pointer '/></Link>
      </div>
      <div className='lg:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white focus:outline-none focus:border-none h-12 w-12 '
            >
              ☰
            </button>
          </div>
          </div>
          <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
          
          <Link to="/live/:id">
      <button type="button" className=' p-3 rounded-lg text-white font-semibold mr-4 hover:bg-blue-900  px-4 bg-red-600 hover:bg-red-700'>Live Score</button>
      </Link>
      <Link to="/">
        <button type="button" className='p-3 rounded-lg text-white font-semibold hover:bg-blue-900 px-4'>Home</button>
      </Link>
      <Link to="/bookingpage">
        <button type="button" className='p-3 rounded-lg text-white font-semibold  hover:bg-blue-900 px-4'>Booking Slot</button>
      </Link>
      <Link to="/quiz">
        <button type="button" className='rounded-lg p-3 text-white font-semibold  hover:bg-blue-900 px-4'>Take Quiz</button>
      </Link>
      <Link to="/match">
        <button type="button" className='mt-0 rounded-lg p-3 text-white font-semibold hover:bg-blue-900 px-4'>Matches Details</button>
      </Link>
      <Link to="/userRegistration">
        <button type="button" className='mt-0 rounded-lg p-3 text-white font-semibold hover:bg-blue-900 px-4'>RegistrationForm</button>
      </Link>
      </div>
      </div>
</nav>
<Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bookingpage" component={BookingPage} />
          <Route exact path="/quiz" component={QuizPage} />
          <Route exact path="/match" component={Match} />
          <Route exact path="/schedule/:id" component={Squads} />
          <Route exact path="/live/:id" component={LiveScore} />
          <Route exact path="/userRegistration" component={RegistrationForm} />

        </Switch>
        </BrowserRouter>
       
  )
}

export default Navbar