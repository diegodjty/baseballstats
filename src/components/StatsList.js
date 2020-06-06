import React from 'react';

const StatsList = ({player,index}) => {
    return (
        <li><span>{index+1} -</span>{player.name +" "+ player.lastname} <span className="quantity">10</span></li>
    );
};

export default StatsList;