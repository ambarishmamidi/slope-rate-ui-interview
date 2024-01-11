// App.js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import QuizPage from "./components/QuizPage";
import BookingPage from './components/BookingPage';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={BookingPage} />
          <Route exact path="/quiz" component={QuizPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;