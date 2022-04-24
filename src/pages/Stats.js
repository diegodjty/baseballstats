import React, { useEffect, useContext, useState } from 'react';
import styled from '@emotion/styled';
import Container from '../components/layout/Container';
import { backIcon } from '../img';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import StatsList from '../components/StatsList';
import { AppContext } from '../components/Context';
import PitcherStatsList from '../components/PitcherStatsList';

const BackIconImg = styled.img`
  width: 40px;
  margin-top: 10px;
  margin-left: 10px;
`;
const Box = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  h3 {
    text-align: center;
    font-size: 1.8rem;
    color: #ffe600;
    text-decoration: underline;
  }
  ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    border: solid white 1px;
    padding: 1rem;
    margin-top: 2rem;
  }
  li {
    display: flex;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
    .quantity {
      margin-left: auto;
    }
  }
  select {
    margin-bottom: 1rem;
  }

  .row {
    width: 100%;
    display: flex;

    button {
      width: 25%;
      height: 40px;
      font-weight: 700;
      text-transform: uppercase;
      background-color: #fff;
      border: solid 1px rgba(255, 0, 0, 0.7);
      color: red;
    }
  }

  margin-bottom: 2rem;
`;

const Stats = () => {
  const { firebase } = useContext(FirebaseContext);
  const [players, setPlayers] = useState([]);
  const [pitchers, setPitchers] = useState([]);
  const [selectBatters, setSelectBatters] = useState('avg');
  const [selectPitchers, setSelectPitchers] = useState('l');
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);

  useEffect(() => {
    const getStats = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('stats')
        .orderBy(selectBatters, 'desc')
        .onSnapshot(handelSnapshot);
    };
    getStats();
    // eslint-disable-next-line
  }, [selectBatters]);

  function handelSnapshot(snapshot) {
    const Player = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPlayers(Player);
  }
  useEffect(() => {
    const getStatss = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('pitcherStats')
        .orderBy(selectPitchers, 'desc')
        .onSnapshot(handelSnapshot2);
    };
    getStatss();
    // eslint-disable-next-line
  }, [selectPitchers]);

  function handelSnapshot2(snapshot) {
    const Players = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPitchers(Players);
  }

  const handelSelect = (e) => {
    setSelectBatters(e.target.value);
  };
  const handleSelect = (e) => {
    setSelectPitchers(e.target.value);
  };
  return (
    <>
      <Link to={'/season'}>
        <BackIconImg src={backIcon} alt="" />
      </Link>
      <Container>
        <Box>
          <h2>Batting Stats:</h2>
          <h3>{selectBatters.toUpperCase()}</h3>
          <div className="mini-btn-container">
            <div className="row">
              <button value="avg" onClick={handelSelect}>
                AVG
              </button>
              <button value="hr" onClick={handelSelect}>
                HR
              </button>
              <button value="rbi" onClick={handelSelect}>
                RBI
              </button>
              <button value="r" onClick={handelSelect}>
                R
              </button>
            </div>
            <div className="row">
              <button value="h" onClick={handelSelect}>
                H
              </button>
              <button value="b1" onClick={handelSelect}>
                1B
              </button>
              <button value="b2" onClick={handelSelect}>
                B2
              </button>
              <button value="b3" onClick={handelSelect}>
                B3
              </button>
            </div>
            <div className="row">
              <button value="g" onClick={handelSelect}>
                G
              </button>
              <button value="ab" onClick={handelSelect}>
                AB
              </button>
              <button value="bb" onClick={handelSelect}>
                BB
              </button>
              <button value="so" onClick={handelSelect}>
                SO
              </button>
            </div>
          </div>
          <ul>
            {players.map((player, index) => (
              <StatsList
                key={index}
                select={selectBatters}
                player={player}
                index={index}
              />
            ))}
          </ul>
          <h2>Pitching Stats:</h2>
          <div className="row">
            <button value="w" onClick={handleSelect}>
              W
            </button>
            <button value="l" onClick={handleSelect}>
              L
            </button>
            <button value="s" onClick={handleSelect}>
              S
            </button>
            <button disabled></button>
          </div>
          <ul>
            {pitchers.map((pitcher, index) => (
              <PitcherStatsList
                key={index}
                select={selectPitchers}
                pitcher={pitcher}
                index={index}
              />
            ))}
          </ul>
        </Box>
      </Container>
    </>
  );
};

export default Stats;
