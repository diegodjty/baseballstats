import React,{useState,useContext} from 'react';
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import {backIcon} from '../img'
import {Link} from 'react-router-dom'
import {add} from '../img'
import FirebaseContext from './../firebase/context';
import BackIconImg from './../components/ui/BackIconImg';

const AddIcon = styled.img`
    width: 40px;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
`;
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

const Games = () => {

    const {user} =useContext(FirebaseContext)
    return (
    <>
        <Link to={"/season"}><BackIconImg src={backIcon} alt=""/></Link>
        {user &&(
            <AddIcon src={add} alt=""/>
        )}
        <Container>
            <Box>
                <h2>Games</h2>
                <div className="game-card">
                    <div className="head">
                        <span>Final</span> <span>W</span>
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
                            <td>8 </td>
                            <td>9</td>
                            <td>0 </td>
                        </tr>
                    </table>
                    <div className="footer">
                        Details
                    </div>
                </div>
            </Box>  
        </Container>
    </>
    );
};

export default Games;