import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from './../firebase';
import CurrentGameDetail from '../components/CurrentGameDetail';
import { AppContext } from '../components/Context';

const GameDetails = ({ match }) => {
  const [games, setGames] = useState([]);
  const gameid = match.params.gameID;
  const { firebase } = useContext(FirebaseContext);
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);
  let currentGame;
  useEffect(() => {
    const getGame = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('games')
        .onSnapshot(handelSnapshot);
    };
    getGame();
    // eslint-disable-next-line
  }, []);

  function handelSnapshot(snapshot) {
    const newGame = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setGames(newGame);
  }
  if (games.length !== 0) {
    games.map((game) => {
      if (game.id === gameid) {
        currentGame = game;
      }
      return 0;
    });
  }
  return (
    <div>
      {currentGame ? <CurrentGameDetail details={currentGame} /> : null}
    </div>
  );
};

export default GameDetails;
