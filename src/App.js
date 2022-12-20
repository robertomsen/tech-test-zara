import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Podcast from './pages/Podcast/Podcast';
import Episode from './pages/Episode/Episode';
import Nav from './components/Nav/Nav';


function App() {
  return (
    <Router>
      <div id="page">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/podcast/:id">
            <Podcast />
          </Route>
          <Route path="/podcast/:id/episode/:episodeId">
            <Episode />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
