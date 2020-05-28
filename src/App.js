import React from 'react';
import SelectSeason from './pages/SelectSeason';
import Season from './pages/Season';
import Roster from './pages/Roster';
import Games from './pages/Games';
import Stats from './pages/Stats';
import NewPlayer from './pages/NewPlayer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route  exact path="/" component={SelectSeason}/>
        <Route  exact path="/season" component={Season}/>
        <Route  exact path="/roster" component={Roster}/>
        <Route  exact path="/games" component={Games}/>
        <Route  exact path="/stats" component={Stats}/>
        <Route  exact path="/new/player" component={NewPlayer}/>
      </Switch>
    </Router>

  );
}
export default App;
