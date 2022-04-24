import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { FirebaseContext } from '../firebase';
import { useHistory } from 'react-router-dom';
import PlayerGameInfo from './PlayerGameInfo';
import { AppContext } from '../components/Context';

const Containers = styled(Container)`
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-top: 5rem;
  }
`;

const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input,
  select {
    padding: 1rem;
    border: 2px solid white;
    background: transparent;
    margin-bottom: 1rem;
    color: white;
    font-weight: bold;
    &::placeholder {
      color: white;
    }
    option {
      color: black;
    }
  }
  .date {
    width: 100%;
    color: white;
    appearance: none;
  }
  .vs-team {
    input {
      width: 100%;
      margin: 0;
      &::placeholder {
        text-align: center;
        color: white;
      }
    }
    .vs-team-final {
      display: flex;
      margin-top: 0.5rem;
    }
  }
  .button {
    /* margin-top: 1rem; */
  }
  label {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: block;
  }
`;

const NewGame = () => {
  //child component state ref
  const playerGameInfoStateRef = useRef(null);
  const totalRunsStateRef = useRef(null);
  const totalHitsStateRef = useRef(null);
  const [closingPitcher, setClosingPitcher] = useState('');
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);
  //useHistory to redirect
  const history = useHistory();
  const [pitcher, setPitcher] = useState('');

  //Connect to Firebase Context
  const { user, firebase } = useContext(FirebaseContext);
  const [record, setRecord] = useState({
    w: 0,
    l: 0,
  });
  const [precord, setPrecord] = useState({
    w: 0,
    l: 0,
  });
  const [cprecord, setCPrecord] = useState({
    s: 0,
  });
  const [info, setInfo] = useState({
    date: '',
    vsteam: '',
    runs: '',
    hits: '',
    errors: '',
  });
  const [stat, setStat] = useState([]);
  useEffect(() => {
    firebase.db
      .collection('seasons')
      .doc(`${season}`)
      .collection('record')
      .doc('record')
      .get()
      .then((doc) => setRecord(doc.data()));
  });

  useEffect(() => {
    if (pitcher.id) {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('pitcherStats')
        .doc(pitcher.id)
        .get()
        .then((doc) => setPrecord(doc.data()));
    }
    // eslint-disable-next-line
  }, [pitcher.id]);
  useEffect(() => {
    if (closingPitcher.id) {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('pitcherStats')
        .doc(closingPitcher.id)
        .get()
        .then((doc) => setCPrecord(doc.data()));
    }
    // eslint-disable-next-line
  }, [closingPitcher.id]);

  useEffect(() => {
    const getStats = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('stats')
        .onSnapshot(handelSnapshot);
    };
    getStats();
    // eslint-disable-next-line
  }, []);

  function handelSnapshot(snapshot) {
    const newStat = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setStat(newStat);
  }

  //Function to update state
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const Submit = (e) => {
    e.preventDefault();

    // assign ref state to get current data when user click done
    const params = playerGameInfoStateRef.current;
    const totalR = totalRunsStateRef.current;
    const totalH = totalHitsStateRef.current;

    //Combine child component state with this component state into an object
    const data = {
      vsteaminfo: info,
      playerinfo: params,
      totalR,
      totalH,
    };
    firebase.db
      .collection('seasons')
      .doc(`${season}`)
      .collection('games')
      .add(data);
    // eslint-disable-next-line
    params.map((player) => {
      if (stat.length !== 0) {
        // eslint-disable-next-line
        stat.map((s) => {
          if (player.id === s.id) {
            let newAb = player.ab + s.ab;
            let newR = player.r + s.r;
            let newH = player.h + s.b1 + s.b2 + s.b3 + s.hr;
            let newB1 = player.b1 + s.b1;
            let newB2 = player.b2 + s.b2;
            let newB3 = player.b3 + s.b3;
            let newHr = player.hr + s.hr;
            let newRbi = player.rbi + s.rbi;
            let newBb = player.bb + s.bb;
            let newSo = player.so + s.so;
            let newG = s.g + 1;

            firebase.db
              .collection('seasons')
              .doc(`${season}`)
              .collection('stats')
              .doc(player.id)
              .update({
                ab: newAb,
                avg: newH / newAb,
                r: newR,
                h: newH,
                b1: newB1,
                b2: newB2,
                b3: newB3,
                hr: newHr,
                rbi: newRbi,
                bb: newBb,
                so: newSo,
                g: newG,
              });
          }
        });
      }
    });

    // if the team won
    if (totalR > info.runs) {
      let newRecord = record.w + 1;
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('record')
        .doc('record')
        .update({
          w: newRecord,
        });
      let newPRecord = precord.w + 1;
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('pitcherStats')
        .doc(pitcher.id)
        .update({
          w: newPRecord,
        });
      if (closingPitcher !== 'none') {
        let newCPRecord = cprecord.s + 1;
        firebase.db
          .collection('seasons')
          .doc(`${season}`)
          .collection('pitcherStats')
          .doc(closingPitcher.id)
          .update({
            s: newCPRecord,
          });
      }
    } else {
      let newRecord = record.l + 1;
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('record')
        .doc('record')
        .update({
          l: newRecord,
        });
      let newPRecord = precord.l + 1;
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('pitcherStats')
        .doc(pitcher.id)
        .update({
          l: newPRecord,
        });
    }

    document.getElementById('VsTeamForm').reset();
    // Redirect to games page
    history.push('/games');
  };

  return (
    <Containers>
      {user ? (
        <Form id="VsTeamForm">
          <label htmlFor="">Vs Team</label>
          <input
            placeholder="Date"
            type="date"
            name="date"
            onChange={handleChange}
            className="date"
          />
          <div className="vs-team">
            <div className="vs-team-name">
              <input
                type="text"
                placeholder="Vs Team"
                name="vsteam"
                onChange={handleChange}
              />
            </div>
            <div className="vs-team-final">
              <input
                type="number"
                name="runs"
                placeholder="R"
                onChange={handleChange}
              />
              <input
                type="number"
                name="hits"
                placeholder="H"
                onChange={handleChange}
              />
              <input
                type="number"
                name="errors"
                placeholder="E"
                onChange={handleChange}
              />
            </div>
          </div>
          <PlayerGameInfo
            stateRef={playerGameInfoStateRef}
            totalRunsStateRef={totalRunsStateRef}
            totalHitsStateRef={totalHitsStateRef}
            setClosingPitcher={setClosingPitcher}
            pitcher={pitcher}
            setPitcher={setPitcher}
            closingPitcher={closingPitcher}
          />
          {closingPitcher ? (
            <Button
              type="submit"
              onClick={Submit}
              bgColor="true"
              className="button"
            >
              Done
            </Button>
          ) : null}
        </Form>
      ) : (
        <div>YOur not allowed</div>
      )}
    </Containers>
  );
};

export default NewGame;
