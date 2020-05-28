import React from 'react';
import Pitchers from './Pitchers';
import Catchers from './Catchers';
import Infielders from './Infielders';
import Outfielders from './Outfielders';

const RosterPlayers = () => {
    return (
        <>
            <Pitchers />
            <Catchers />
            <Infielders />
            <Outfielders />
        </>
    );
};

export default RosterPlayers;