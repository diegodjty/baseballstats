import React, { useEffect, useContext, useState } from 'react';
import Container from './layout/Container';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import { AppContext } from '../components/Context';

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .Link {
    text-decoration: none;
    color: rgba(255, 0, 0);
  }
  a {
    margin-bottom: 20px;
  }

  .game-card {
    display: block;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    color: black;
    font-size: 1.2rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 6px rgba(0, 0, 0, 0.34);
    margin-bottom: 2rem;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid black 2px;
    padding-bottom: 0.5rem;
    span:first-of-type {
      color: #c4c4c4;
      font-weight: bold;
    }
  }

  table {
    border-bottom: solid black 2px;
    width: 100%;
  }
  .footer {
    text-align: center;
    color: blue;
    margin-top: 1rem;
  }
  table {
    padding: 0.5rem 0;
  }
  .won {
    color: green;
  }
  .lost {
    color: red;
  }
`;
const Games = ({ game }) => {
  const { firebase } = useContext(FirebaseContext);
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);
  const [record, setRecord] = useState({ w: 0, l: 0 });
  const whoWon = (teamR, VsTeamR) => {
    if (teamR < VsTeamR) {
      return <span className="lost"> L </span>;
    }
    return <span className="won"> W </span>;
  };
  useEffect(() => {
    const getRecords = () => {
      firebase.db
        .collection('seasons')
        .doc(`${season}`)
        .collection('record')
        .doc('record')
        .get()
        .then((doc) => setRecord(doc.data()));
    };
    getRecords();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Box>
        <h2>Games</h2>
        <p>{`Record: ${record.w} - ${record.l}`}</p>
        {game.map((i) => (
          <div className="game-card" key={i.id}>
            <div className="head">
              <span>Final</span> <span>{i.vsteaminfo.date}</span>{' '}
              {whoWon(i.totalR, i.vsteaminfo.runs)}
            </div>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>R</td>
                  <td>H</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Los Patrones</td>
                  <td>{i.totalR}</td>
                  <td>{i.totalH}</td>
                </tr>
                <tr>
                  <td>{i.vsteaminfo.vsteam}</td>
                  <td>{i.vsteaminfo.runs}</td>
                  <td>{i.vsteaminfo.hits}</td>
                </tr>
              </tbody>
            </table>
            <div className="footer">
              <Link to={`gameDetails/${i.id}`}>Details</Link>
            </div>
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default Games;
