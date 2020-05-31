import React from 'react';
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
`;
const Games = ({game}) => {
     
    
    return (
        
        <Container>
            <Box>
                <h2>Games</h2>
                {game.map((i)=>(
                    <>
                        
                    <div className="game-card">
                        <div className="head">
                            <span>Final</span> <span>{i.vsteaminfo.date}</span><span>W</span>
                        </div>
                        <table>
                            <tr>
                                <td></td>
                                <td>R</td>
                                <td>H</td>
                                <td>E</td>
                            </tr>
                            <tr>
                                <td>Los Patrones</td>
                                <td>8 </td>
                                <td>9</td>
                                <td>0 </td>
                            </tr>
                            <tr>
                                <td>Juncalito</td>
                                <td>{i.vsteaminfo.runs}</td>
                                <td>{i.vsteaminfo.hits}</td>
                                <td>{i.vsteaminfo.errors}</td>
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