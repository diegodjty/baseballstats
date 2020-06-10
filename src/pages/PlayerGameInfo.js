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


const PlayerGameInfo = ({stateRef,totalRunsStateRef,totalHitsStateRef}) => {
    const [info,setInfo] = useState({
        battingnumber: 0,
        name:'',
        position: '',
        ab: 0,
        r: 0,
        h: 0,
        b1: 0,
        b2: 0,
        b3: 0,
        hr: 0,
        rbi: 0,
        bb: 0,
        so: 0
    });
    const [playersInfo,setPlayersInfo] = useState([])
    const [totalRuns,setTotalRuns] = useState(0)
    const [totalHits,setTotalHits] = useState(0)
    
    useEffect(()=>{
        const setRef = ()=>{
            stateRef.current = playersInfo;
        }
        setRef()
        // eslint-disable-next-line
    },[playersInfo])



    useEffect(()=>{
        const setRef = ()=>{
            totalRunsStateRef.current = totalRuns;
        }
        setRef()
        // eslint-disable-next-line
    },[totalRuns])

    useEffect(()=>{
        const setData =() =>{
            setTotalRuns(totalRuns+info.r)
        }
        setData()
    },[info.r])

    useEffect(()=>{
        const setRef = ()=>{
            totalHitsStateRef.current = totalHits;
        }
        setRef()
        // eslint-disable-next-line
    },[totalHits])

    useEffect(()=>{
        const setData =() =>{
            setTotalHits(totalHits+(info.b1+info.b2+info.b3+info.hr))
        }
        setData()
    },[info.b1,info.b2,info.b3,info.hr])

    useEffect(()=>{
        setInfo({
            ...info,
            h: info.b1+info.b2+info.b3+info.hr
        })
    },[info.b1+info.b2+info.b3+info.hr])
    
    //useHistory to redirect
    // const history = useHistory()

    //Connect to Firebase Context
    const {firebase} = useContext(FirebaseContext)
    const {b1,b2,b3,hr} = info
    //Function to update state
    const handleChange = (e) =>{
        if(e.target.name ==="name" || e.target.name ==="position"){
            setInfo({
                ...info,
                [e.target.name]: e.target.value
            })
        }else{
            setInfo({
                ...info,
                [e.target.name]: parseInt(e.target.value)
            })
        }
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

    // functions that adds the id of the document to the player
    function setRefToDoc(){
        players.map((player)=>{
            Object.entries(info).map(([key,value])=>{
                if(key==="name"){
                    if(value===player.name+" "+player.lastname){
                        info.id=player.id
                    }
                }
            })

        })
    }
    

    const add = (e) => {
        e.preventDefault();
        setInfo({...info,
            h: parseInt(b1+b2+b3+hr)
        })
        setPlayersInfo([
            ...playersInfo,
            info
        ])
        setRefToDoc()
      
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
                        <input type="number" required name="ab" onChange={handleChange} placeholder="AB"/>
                        <input type="number" required name="b1" onChange={handleChange} placeholder="1B"/>
                        <input type="number" required name="b2"onChange={handleChange} placeholder="2B"/>
                    </div>
                    <div className="second-row">
                        <input type="number" required name="b3"onChange={handleChange} placeholder="3B"/>
                        <input type="number" required name="hr"onChange={handleChange} placeholder="HR"/>
                        <input type="number" required name="r" onChange={handleChange} placeholder="R"/>
                    </div>
                    <div className="second-row">
                        <input type="number" required name="rbi" onChange={handleChange} placeholder="RBI"/>
                        <input type="number" required name="bb" onChange={handleChange} placeholder="BB"/>
                        <input type="number" required name="so" onChange={handleChange} placeholder="SO"/>
                    </div>
                </div>
                <input  type="submit" onClick={add} className="next-button button" value="Next"/>
            </Form>
        </Containers>
    );
};

export default PlayerGameInfo;