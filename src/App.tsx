import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Current from './components/Current';
import History from './components/History';
import Result from './components/Result';
import About from './components/About';

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Current/>
        </Route>

        <Route path='/current'>
          <Current/>
        </Route>

        <Route path='/history/select'>
          <History />
        </Route>

        <Route path='/history/result'>
          <Result />
        </Route>

        <Route path='/about'>
          <About />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;