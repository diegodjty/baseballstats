import React from 'react';
import styled from '@emotion/styled';
import {avatar} from '../img'

const PlayerContainer = styled.div`
    .bar{
        background-color: #c4c4c4;
        color: black;
        padding: 5px 5px;
    }

    .player-info{
        display: flex;
        align-items: center
    }
    .icon{
        margin-left: .5rem;
    }
    .info{
        line-height:.5;
        margin-left: 3rem;
    }
`;

const Infielders = () => {
    return (
        <PlayerContainer>
           <div className="bar">Infielders</div>
           <div className="player-info">
               <div className="icon">
                   <img src={avatar} alt=""/>
               </div>
               <div className="info">
                   <p>Diego Taveras</p>
                   <p>#2</p>
                   <p>B/T: RR</p>
               </div>
           </div>
           <div className="player-info">
               <div className="icon">
                   <img src={avatar} alt=""/>
               </div>
               <div className="info">
                   <p>Diego Taveras</p>
                   <p>#2</p>
                   <p>B/T: RR</p>
               </div>
           </div>
        </PlayerContainer>
    );
};

export default Infielders;