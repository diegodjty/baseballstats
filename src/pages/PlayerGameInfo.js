import React,{useState,useContext,useEffect} from 'react';
import Container from '../components/layout/Container';
import styled from '@emotion/styled';
import Button from '../components/ui/Button';
import {FirebaseContext} from '../firebase'
// import {useHistory} from 'react-router-dom'


const Containers = styled(Container)`
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-top: 5rem; 
    }
`;

const Form = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    input,select{
        padding: 1rem;
        border: 2px solid white;
        background: transparent;
        margin-bottom: 1rem;
        color: white;
        font-weight: bold;
        &::placeholder{
            color: white;
        }
        option{
            color: black;
        }
    }
    label{
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: block;
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
    .next-button{
        margin-bottom: 1rem;
    }
`;


const PlayerGameInfo = ({stateRef}) => {

    const [info,setInfo] = useState({
        battingnumber: 0,
        name:'',
        position: '',
        ab: 0,
        r: 0,
        h:0,
        b2: 0,
        b3: 0,
        hr: 0,
        rbi: 0,
        bb: 0,
        so: 0
    });

    

    const [playersInfo,setPlayersInfo] = useState([])
    
    useEffect(()=>{
        const getData = ()=>{
            stateRef.current = playersInfo
        }
        getData()
        // eslint-disable-next-line
    },[playersInfo])
    
    //useHistory to redirect
    // const history = useHistory()

    //Connect to Firebase Context
    const {firebase} = useContext(FirebaseContext)
    
    //Function to update state
    const handleChange = (e) =>{
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    //Getting players from firebase to append them to the select input
    const [players,setPlayer] = useState([])
    useEffect(() => {
        const getPlayers = () => {
            firebase.db.collection('seasons').doc('season').collection('roster').onSnapshot(handelSnapshot)
        }
        getPlayers()
        // eslint-disable-next-line
    }, [])

    function handelSnapshot(snapshot){
        const newPlayer = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setPlayer(newPlayer)
    }

   
    const add = (e) => {
        e.preventDefault();
        setPlayersInfo([
            ...playersInfo,
            info
        ])
    }
    

    return (
        <Containers>
            <Form>
                <label htmlFor="">Lineup</label>
                <div className="player-box">
                    <div className="first-row">
                        <input type="number"  name="battingnumber" onChange={handleChange} className="batting-number"/>
                        <select name="name"   className="player-name" onChange={handleChange}>
                            <option>--Player--</option>
                            {players.map(player=>(
                                <option key={player.id}>{player.name}{' '}{player.lastname}</option>
                            ))}
                        </select>
                        <select name="position"  className="position" onChange={handleChange}>
                            <option ></option>
                            <option value="1b">1B</option>
                            <option value="2b">2B</option>
                            <option value="3b">3B</option>
                            <option value="ss">SS</option>
                            <option value="lf">LF</option>
                            <option value="cf">CF</option>
                            <option value="rf">RF</option>
                            <option value="p">P</option>
                            <option value="c">C</option>
                            <option value="dh">DH</option>
                            <option value="a">A</option>
                        </select>
                    </div>
                    <div className="second-row">
                        <input type="number" name="ab" onChange={handleChange} placeholder="AB"/>
                        <input type="number" name="h" onChange={handleChange} placeholder="H"/>
                        <input type="number" name="r" onChange={handleChange} placeholder="R"/>
                    </div>
                    <div className="second-row">
                        <input type="number" name="b2"onChange={handleChange} placeholder="2B"/>
                        <input type="number" name="b3"onChange={handleChange} placeholder="3B"/>
                        <input type="number" name="hr"onChange={handleChange} placeholder="HR"/>
                    </div>
                    <div className="second-row">
                        <input type="number" name="rbi" onChange={handleChange} placeholder="RBI"/>
                        <input type="number" name="bb" onChange={handleChange} placeholder="BB"/>
                        <input type="number" name="so" onChange={handleChange} placeholder="SO"/>
                    </div>
                </div>
                <Button type="submit" onClick={add} className="next-button">Next</Button>
            </Form>
        </Containers>
    );
};

export default PlayerGameInfo;