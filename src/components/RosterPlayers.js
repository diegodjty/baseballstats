import React, { useState, useContext, useEffect } from 'react';
import Pitchers from './Pitchers';
import Catchers from './Catchers';
import Infielders from './Infielders';
import Outfielders from './Outfielders';
import { FirebaseContext } from './../firebase';
import { AppContext } from '../components/Context';
const RosterPlayers = () => {
  const [players, setPlayer] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);

  useEffect(() => {
    const getPlayers = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('roster')
        .onSnapshot(handelSnapshot);
    };
    getPlayers();
    // eslint-disable-next-line
  }, []);

  function handelSnapshot(snapshot) {
    const newPlayer = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPlayer(newPlayer);
  }

  return (
    <>
      <div className="bar">Pitchers</div>
      {players.map((player) =>
        player.position === 'pitcher' ? (
          <Pitchers player={player} key={player.id} />
        ) : null
      )}
      <div className="bar">Catchers</div>
      {players.map((player) =>
        player.position === 'catcher' ? (
          <Catchers player={player} key={player.id} />
        ) : null
      )}
      <div className="bar">Infielders</div>
      {players.map((player) =>
        player.position === 'infielder' ? (
          <Infielders player={player} key={player.id} />
        ) : null
      )}
      <div className="bar">Outfielders</div>
      {players.map((player) =>
        player.position === 'outfielder' ? (
          <Outfielders player={player} key={player.id} />
        ) : null
      )}
    </>
  );
};

export default RosterPlayers;
