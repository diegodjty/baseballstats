import React from 'react';

const StatsList = ({player,index,select}) => {
  
    return ( 
        <li>
            <span>{index+1}-</span>{player.name}
            <span className="quantity">{select!=='avg'?player[select] :player[select].toFixed(3)}</span> {/*only fix to 3 positions the avg*/}
        </li> 
    );
};

export default StatsList;