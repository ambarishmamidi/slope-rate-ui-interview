import React from 'react'
import QuizPage from './QuizPage';
import BookingPage from './BookingPage';
import UserRegistrationForm from './UserRegistrationForm';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
function Navbar() {
  return (
    <div style={{position:"fixed"}}>
    
    <BrowserRouter>
    <ul>
    <li><Link to = '/quiz'> QuizPage </Link>
    </li>

    <li><Link to = '/register'> UserRegistrationForm </Link>
    </li>

    <li><Link to = '/'> BookingPage </Link>
    </li>
    
    </ul>
    <Switch>
      <Route exact path="/" component={BookingPage } />
      <Route exact path="/quiz" component={QuizPage} />
      <Route exact path="/register" component={UserRegistrationForm} />
    </Switch>
  </BrowserRouter></div>
  )
}

export default Navbar