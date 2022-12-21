import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Podcast from './pages/Podcast/Podcast';
import Episode from './pages/Episode/Episode';
import Nav from './components/Nav/Nav';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

function App() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div id="page">
        <Nav loading={loading} />
        <Switch>
          <Route exact path="/">
            <Home setLoadingNav={setLoading} />
          </Route>
          <Route exact path="/podcast/:id">
            <Podcast setLoadingNav={setLoading} />
          </Route>
          <Route exact path="/podcast/:id/episode/:episodeId">
            <Episode setLoadingNav={setLoading} setTrack={setTrack} />
          </Route>
        </Switch>
        {track !== null ? <AudioPlayer data={track} /> : null}
      </div>
    </Router>
  );
}

export default App;
