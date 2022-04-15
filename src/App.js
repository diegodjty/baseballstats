import React from 'react';
import SelectSeason from './pages/SelectSeason';
import Season from './pages/Season';
import Roster from './pages/Roster';
import GamesList from './pages/GamesList';
import Stats from './pages/Stats';
import NewPlayer from './pages/NewPlayer';
import NewGame from './pages/NewGame';
import Login from './pages/Login';
import GameDetails from './pages/GameDetails';
import PlayerGameInfo from './pages/PlayerGameInfo';
import firebase, { FirebaseContext } from './firebase';
import useAuthentication from './hooks/useAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './components/Context';

function App() {
  const user = useAuthentication();
  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={SelectSeason} />
            <Route exact path="/season" component={Season} />
            <Route exact path="/roster" component={Roster} />
            <Route exact path="/games" component={GamesList} />
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/new/player" component={NewPlayer} />
            <Route exact path="/new/game" component={NewGame} />
            <Route exact path="/new/player/info" component={PlayerGameInfo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/gameDetails/:gameID" component={GameDetails} />
          </Switch>
        </Router>
      </AppProvider>
    </FirebaseContext.Provider>
  );
}
export default App;
