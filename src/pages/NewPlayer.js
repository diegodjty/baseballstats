import React, { useState, useContext } from 'react';
import Container from './../components/layout/Container';
import styled from '@emotion/styled';
import Button from './../components/ui/Button';
import { FirebaseContext } from '../firebase';
import { useHistory } from 'react-router-dom';
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
    /* -webkit-appearance: none; */
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
`;

const BatCatch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  select {
    width: 45%;
  }
`;

const NewPlayer = () => {
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);

  const [player, setPlayer] = useState({
    name: '',
    lastname: '',
    number: null,
    position: '',
    bats: '',
    catchs: '',
  });
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const handelChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    });
  };
  const Submit = (e) => {
    e.preventDefault();
    firebase.db
      .collection('seasons')
      .doc(`${season}`)
      .collection('roster')
      .add(player)
      .then(function (docRef) {
        firebase.db
          .collection('seasons')
          .doc(`${season}`)
          .collection('stats')
          .doc(docRef.id)
          .set({
            name: player.name + ' ' + player.lastname,
            avg: 0,
            hr: 0,
            rbi: 0,
            r: 0,
            h: 0,
            b1: 0,
            b2: 0,
            b3: 0,
            g: 0,
            ab: 0,
            bb: 0,
            so: 0,
          });
      });

    history.push('/roster');
  };

  return (
    <Containers>
      <h2>New Player</h2>
      <Form>
        <input
          type="text"
          onChange={handelChange}
          name="name"
          placeholder="Name"
        />
        <input
          type="text"
          onChange={handelChange}
          name="lastname"
          placeholder="Last Name"
        />
        <input
          type="number"
          onChange={handelChange}
          name="number"
          placeholder="Number"
        />
        <select name="position" onChange={handelChange}>
          <option>-Position-</option>
          <option value="pitcher">Pitcher</option>
          <option value="catcher">Catcher</option>
          <option value="infielder">Infielder</option>
          <option value="outfielder">Outfielder</option>
        </select>
        <BatCatch>
          <select name="bats" onChange={handelChange}>
            <option value="">Bats</option>
            <option value="R">R</option>
            <option value="L">L</option>
          </select>
          <select name="catchs" onChange={handelChange}>
            <option value="">Catchs</option>
            <option value="R">R</option>
            <option value="L">L</option>
          </select>
        </BatCatch>
        <Button type="submit" onClick={Submit} bgColor="true">
          Create
        </Button>
      </Form>
    </Containers>
  );
};

export default NewPlayer;
