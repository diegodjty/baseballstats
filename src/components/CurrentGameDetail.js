import React from 'react'
import Container from '../components/layout/Container';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom'
import BackIconImg from './../components/ui/BackIconImg';
import { backIcon } from '../img';


const Containers = styled(Container)`
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-top: 5rem; 
    }
`;

const Form = styled.form`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cell{
        padding: 1rem;
        border: 2px solid white;
        background: transparent;
        margin-bottom: 1rem;
        color: white;
        font-weight: bold;
    }
    .player-box{    
        margin-bottom: 1rem;
        .first-row,.second-row{
            display: flex;      
    }
    .second-row{
        .cell{
            width: 34%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding:0;
            margin: 0;
        }
        .batting-number{
            width: 25%;
        }
        .player-name{
            width: 50%;
        }
        .position{
            width: 25%;
        }
        span{
            margin-left: 10px;
            color: #FFE600;
        }
    }
    
    
    }
`;

const CurrentGameDetail = ({details}) => {
    console.log(details);
    const {id,playerinfo,totalH,totalR,vsteaminfo} = details
    return (
        <>
            <Link to={"/games"}><BackIconImg src={backIcon} alt=""/></Link>
            <Containers>
                <h2>Game Details</h2>
                <Form id="playerForm"> 
                        {playerinfo.map((player)=> (
                        <div className="player-box">
                            <div className="second-row">
                                <div className="cell batting-number" type="number"  name="battingnumber">{player.battingnumber}</div>
                                <div className="cell player-name" name="name">{player.name}</div> 
                                <div className="cell position" name="position" >{player.position.toUpperCase()}</div> 
                            </div>
                            <div className="second-row">
                                <div className="cell" type="number" required name="ab"  placeholder="AB">AB:<span>{player.ab}</span></div>
                                <div className="cell" type="number" required name="b1"   placeholder="1B">1B:<span>{player.b1}</span></div>
                                <div className="cell" type="number" required name="b2"   placeholder="2B">2B:<span>{player.b2}</span></div>
                            </div>
                            <div className="second-row">
                                <div className="cell" type="number" required name="b3"   placeholder="3B">3B:<span>{player.b3}</span></div>
                                <div className="cell" type="number" required name="hr"   placeholder="HR">HR:<span>{player.hr}</span></div>
                                <div className="cell" type="number" required name="r"   placeholder="R">R:<span>{player.r}</span></div>
                            </div>
                            <div className="second-row">
                                <div className="cell" type="number" required name="rbi"  placeholder="RBI">RBI:<span>{player.rbi}</span></div>
                                <div className="cell" type="number" required name="bb"   placeholder="BB">BB:<span>{player.bb}</span></div>
                                <div className="cell" type="number" required name="so"   placeholder="SO">SO:<span>{player.so}</span></div>
                            </div>
                        </div>
                        ))}
                    
                </Form>
            </Containers>
        </>
    )
}

export default CurrentGameDetail
