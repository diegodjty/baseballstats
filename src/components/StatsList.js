import React from 'react';
import styled from '@emotion/styled'

const Number= styled.span`
    color: #FFE600;
`;
const StatsList = ({player,index,select}) => {
  
    return ( 
        <li>
            <span>{index+1}-</span>{player.name}
            <Number className="quantity">{select!=='avg'?player[select] :player[select].toFixed(3)}</Number> {/*only fix to 3 positions the avg*/}
        </li> 
    );
};

export default StatsList;