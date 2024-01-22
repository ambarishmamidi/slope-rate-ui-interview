import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import BookingPage from '../BookingPage'
import QuizPage from '../QuizPage'
import Match from '../matches/Match'
import logo from '../../assests/slope rate.jpeg'
import Squads from '../Squad/Squads'

function Header() {
  return (
    <div className=' w-[1024px} fixed'>
        <BrowserRouter>
        <nav>
<div className='flex justify-start items-center flex-row bg-blue-500 p-2    rounded-lg mt-2 container-sm shadow-sm shadow-black fixed w-full '>
<div className='flex justify-start items-center mr-[800px]'>
    <Link to='/'><img src={logo} alt='' className='rounded-md w-24 h-12 cursor-pointer ml-16'/></Link>
</div>
      <Link to="/">
      <button type="button" className='bg-blue-600 p-3 rounded-lg text-white font-semibold mr-10 hover:bg-blue-900  px-4'>Booking Slot</button>
      </Link>
      <Link to="/quiz">
      <button type="button" className='bg-blue-600 rounded-lg p-3 text-white font-semibold mr-10 hover:bg-blue-900 px-4'>Take Quiz</button>
      </Link>
      <Link to="/match">
      <button type="button" className='mt-0 bg-blue-600 rounded-lg p-3 text-white font-semibold hover:bg-blue-900 px-4'>Matches Details</button>
      </Link>
      </div>
      </nav>
      <Switch>
      <Route exact path="/" component={BookingPage} />
          <Route exact path="/quiz" component={QuizPage} />
          <Route exact path="/match" component={Match} />
          <Route exact path="/squad" component={Squads} />
          
        </Switch>
      </BrowserRouter>


    </div>
  )
}

export default Header