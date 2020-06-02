import React,{useState, useEffect} from 'react';
import Container from './layout/Container';
import styled from '@emotion/styled'

const Box = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-bottom: 5rem;
    }
    .Link{
        text-decoration: none;
        color: rgba(255,0,0)
    }
    a{
        margin-bottom: 20px;
    }

    .game-card{
        display: flex;
        flex-direction: column;
        background-color: #fff;
        padding: 1rem;
        color: black;
        font-size: 1.2rem;
        border-radius: 10px;
        box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.34);
        margin-bottom: 2rem;
    }
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid black 2px;
        padding-bottom: .5rem;
        span:first-child{
            color: #c4c4c4;
            font-weight: bold;
        }
    }

    table{
        border-bottom: solid black 2px;
    }
    .footer{
        text-align: center;
        color: blue;
        margin-top: 1rem;
    }
    table{
        padding: .5rem 0;
    }
    .won{
        color: green;
    }
    .lost{
        color: red;
    }
`;
const Games = ({game}) => {

    const whoWon = (teamR,VsTeamR)=>{
        if(teamR < VsTeamR){
            return <span className="lost"> L </span>
        }
        return <span className="won"> W </span>
    }
    
    return (
        
        <Container>
            <Box>
                <h2>Games</h2>
                {game.map((i)=>(
                    <>
                        
                    <div className="game-card">
                        <div className="head">
                            <span>Final</span> <span>{i.vsteaminfo.date}</span> {whoWon(i.totalR,i.vsteaminfo.runs)}
                        </div>
                        <table>
                            <tr>
                                <td></td>
                                <td>R</td>
                                <td>H</td>
                            </tr>
                            <tr>
                                <td>Los Patrones</td>
                                <td>{i.totalR}</td>
                                <td>{i.totalH}</td>
                            </tr>
                            <tr>
                                <td>Juncalito</td>
                                <td>{i.vsteaminfo.runs}</td>
                                <td>{i.vsteaminfo.hits}</td>
                            </tr>
                        </table>
                        <div className="footer">
                            Details
                        </div>
                    </div>
                    </>
                ))}
            </Box>  
        </Container>
        
    );
};

export default Games;