import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import Container from '../components/layout/Container';
import { useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import { AppContext } from '../components/Context';

const Containers = styled(Container)`
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-top: 5rem;
  }
`;

const Form = styled.div`
  .field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input,
    select {
      width: 50%;
      padding: 0.5rem;
    }
  }
  label {
    font-size: 1.2rem;
  }
`;

export default function PitcherInfo({
  info,
  setClosingPitcher,
  setPitcher,
  pitcher,
}) {
  const { firebase } = useContext(FirebaseContext);
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);
  const [pitchers, setPitchers] = useState([]);

  useEffect(() => {
    const getPlayers = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('roster')
        .where('position', '==', 'pitcher')
        .onSnapshot(handelSnapshot);
    };
    getPlayers();
    // eslint-disable-next-line
  }, []);

  function handelSnapshot(snapshot) {
    const newPitchers = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPitchers(newPitchers);
  }
  useEffect(() => {
    if (info.position === 'p') {
      // eslint-disable-next-line
      pitchers.map((pitcher) => {
        if (pitcher.name + ' ' + pitcher.lastname === info.name) {
          return setPitcher({ name: info.name, id: pitcher.id });
        }
      });
    }
    // eslint-disable-next-line
  }, [info.position]);

  const handleClosingPitcher = (e) => {
    if (e.target.value !== 'none') {
      // eslint-disable-next-line
      pitchers.map((pitcher) => {
        if (pitcher.name + ' ' + pitcher.lastname === e.target.value) {
          return setClosingPitcher({ name: e.target.value, id: pitcher.id });
        }
      });
    } else {
      return setClosingPitcher('none');
    }
  };

  return (
    <Containers>
      <label htmlFor="">Pitchers</label>
      <Form>
        <div className="field">
          <label htmlFor="">Starting pitcher:</label>
          <input type="text" value={pitcher.name} onChange={setPitcher} />
        </div>
        <div className="field">
          <label htmlFor="">Closing pitcher:</label>
          <select
            name="name"
            className="player-name"
            onChange={handleClosingPitcher}
          >
            <option>--Pitcher--</option>
            <option value="none">NONE</option>
            {pitchers.map((pitcher) => (
              <option key={pitcher.id}>
                {pitcher.name} {pitcher.lastname}
              </option>
            ))}
          </select>
        </div>
      </Form>
    </Containers>
  );
}
