import React,{useContext,useEffect,useState} from 'react';
import styled from '@emotion/styled'
import {backIcon} from '../img'
import {Link} from 'react-router-dom'
import {add} from '../img'
import FirebaseContext from '../firebase/context';
import BackIconImg from '../components/ui/BackIconImg';
import Games from './../components/Games';
import { v4 as uuidv4 } from 'uuid'

const AddIcon = styled.img`
    width: 40px;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
`;

const GamesList = () => {

    const {user,firebase} = useContext(FirebaseContext)
    const [game,setGame] = useState([])
    
    useEffect(() => {
        const getPlayers = () => {
            firebase.db.collection('seasons').doc('season').collection('games').onSnapshot(handelSnapshot)
        }
        getPlayers()
        // eslint-disable-next-line
    }, [])

    function handelSnapshot(snapshot){
        const newGame = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setGame(newGame)
        
    }
    const idkey= uuidv4();
    return (
    <>
         
        <Link to={"/season"}><BackIconImg src={backIcon} /></Link>
        {user &&(
            <Link to={"/new/game"}><AddIcon src={add} a/></Link>
        )}
        
        {game[0] ? 
            <Games key={idkey} game={game} />
        : null}
        
    </>
    );
};

export default GamesList;