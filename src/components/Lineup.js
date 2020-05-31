import React,{useState} from 'react';
import styled from '@emotion/styled'
import Player from './Player';

const LineupStyle = styled.div`
    margin-top: 1rem;
    font-weight: bold;
    label{
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: block;
    }
}
.player-box{
    border: solid white 1px;
    margin-bottom: 1rem;
    .first-row,.second-row{
        display: flex;
        .batting-number{
            width: 10%;
            text-align: center;
        }
        .player-name{
            flex-grow: 2;
        }
        select,input{
            padding:0;
            margin: 0;
        }
        
    }
    .second-row{
        input{
            width: 34%;
            height: 40px;
            text-align: center;
            &::placeholder{
                text-align: center;
            }
        }
    }
}
`;

const Lineup = props => {

    const [quantity,setQuantity] = useState([1,2,3,4,5,6,7,8,9,10,11])
    return (
        <LineupStyle className="lineup">
            <label htmlFor="">Lineup</label>
            {quantity.map((number)=>(
                <Player  number={number}/>
            ))}
         </LineupStyle>
    );
};

export default Lineup;