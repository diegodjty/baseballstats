import React,{useState,useContext,useEffect} from 'react';
import Pitchers from './Pitchers';
import Catchers from './Catchers';
import Infielders from './Infielders';
import Outfielders from './Outfielders';
import {FirebaseContext} from './../firebase';
const RosterPlayers = () => {
    const [players,setPlayer] = useState([])
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const getPlayers = () => {
            firebase.db.collection('seasons').doc('season').collection('roster').onSnapshot(handelSnapshot)
        }
        getPlayers()
    }, [])

    function handelSnapshot(snapshot){
        const newPlayer = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setPlayer(newPlayer)
    }
    return (
        <>
            {players.map( player=>(
                player.position === 'pitcher' ?
                    <Pitchers player={player} />  
                : 
                null
            ))}
            {players.map( player=>(
                player.position === 'catcher' ?
                    <Catchers player={player} />  
                : 
                null
            ))}
            {players.map( player=>(
                player.position === 'infielder' ?
                    <Infielders player={player} />  
                : 
                null
            ))}
            {players.map( player=>(
                player.position === 'outfielder' ?
                    <Outfielders player={player} />  
                : 
                null
            ))}
            
            
           
        </>
    );
};

export default RosterPlayers;
