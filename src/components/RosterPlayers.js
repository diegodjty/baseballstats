import React from 'react';
import Pitchers from './Pitchers';
import Catchers from './Catchers';
import Infielders from './Infielders';
import Outfielders from './Outfielders';

const players = [
    {
        id: 1,
        name: 'Diego',
        lastname: 'Taveras',
        number: 2,
        bats: 'r',
        catchs: 'r',
        position: 'infielder'
    },
    {
        id: 2,
        name: 'Ronald',
        lastname: 'Espinal',
        number: 24,
        bats: 'r',
        catchs: 'r',
        position: 'outfielder'
    },
    {
        id: 3,
        name: 'Juan',
        lastname: 'Antonio',
        number: 51,
        bats: 'r',
        catchs: 'r',
        position: 'pitcher'
    },
    {
        id: 3,
        name: 'Pedro',
        lastname: 'Rodriguez',
        number: 31,
        bats: 'r',
        catchs: 'r',
        position: 'catcher'
    },

]

const RosterPlayers = () => {
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
