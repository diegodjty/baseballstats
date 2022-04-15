import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../components/ui/Button';
import { backIcon } from '../img';
import { Link } from 'react-router-dom';
import Container from './../components/layout/Container';
import { AppContext } from '../components/Context';
import { useState } from 'react';
import { FirebaseContext } from '../firebase';

const BackIconImg = styled.img`
  width: 40px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 10rem;
  }

  .seasonsBtn {
    display: flex;
    flex-direction: column;
    margin-top: 20rem;
  }

  .Link {
    text-decoration: none;
    color: rgba(255, 0, 0);
  }
  .btn {
    margin-bottom: 1rem;
  }
`;

const Season = () => {
  // eslint-disable-next-line
  const [season, setSeason] = useContext(AppContext);
  // eslint-disable-next-line
  const { user, firebase } = useContext(FirebaseContext);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    firebase.db
      .collection('seasons')
      .doc(`${season}`)
      .get()
      .then((doc) => setYear(doc.data().year));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Link to={'/'}>
        <BackIconImg src={backIcon} alt="" />
      </Link>
      <Container>
        <Box>
          {year && <h2>Season : {year} </h2>}
          <div className="seasonBtn">
            <Button bgColor="true" Tcolor="true" className="btn">
              <Link className="Link" to={'/games'}>
                Games
              </Link>
            </Button>
            <Button bgColor="true" Tcolor="true" className="btn">
              <Link className="Link" to={'/roster'}>
                Roster
              </Link>
            </Button>
            <Button bgColor="true" Tcolor="true" className="btn">
              <Link className="Link" to={'/stats'}>
                Stats
              </Link>
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Season;
