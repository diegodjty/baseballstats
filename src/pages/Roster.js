import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Container from '../components/layout/Container';
import { backIcon, add } from '../img';
import { Link } from 'react-router-dom';
import RosterPlayers from './../components/RosterPlayers';
import FirebaseContext from './../firebase/context';
import BackIconImg from './../components/ui/BackIconImg';

const AddIcon = styled.img`
  width: 40px;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
`;
const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 5rem;
  }
  .Link {
    text-decoration: none;
    color: rgba(255, 0, 0);
  }
  a {
    margin-bottom: 20px;
  }
  .bar {
    background-color: #ffe600;
    color: black;
    padding: 5px 5px;
  }
`;

const Roster = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <>
      <Link to={'/season'}>
        <BackIconImg src={backIcon} alt="" />
      </Link>
      {user && (
        <Link to={'/new/player'}>
          <AddIcon src={add} alt="" />
        </Link>
      )}
      <Container>
        <Box>
          <h2>Roster</h2>
          <RosterPlayers />
        </Box>
      </Container>
    </>
  );
};

export default Roster;
