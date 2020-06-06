import React,{useEffect,useContext,useState} from 'react';
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import {backIcon} from '../img'
import {Link} from 'react-router-dom'
import {FirebaseContext} from '../firebase'
import StatsList from '../components/StatsList'

const BackIconImg = styled.img`
    width: 40px;
    margin-top: 10px;
    margin-left: 10px;
`
const Box = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-bottom: 5rem;
    }
    ul{
        list-style: none;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    li{
        display: flex;
        color: black;
        font-weight: bold;
        font-size: 1.2rem;
        .quantity{
            margin-left: auto;
        }
    }
    select{
        margin-bottom: 1rem;
    }
`;

const Stats = () => {

    const {user,firebase} = useContext(FirebaseContext)
    const [players,setPlayers] = useState([])

    useEffect(() => {
        const getStats = () => {
            firebase.db.collection('seasons').doc('season').collection('roster').onSnapshot(handelSnapshot)
        }
        getStats()
        // eslint-disable-next-line
    }, [])
    
    function handelSnapshot(snapshot){
        const Player = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setPlayers(Player)
    }
    useEffect(()=>{
        const setPlayerStats = () =>{
            players.map((player)=>{
                firebase.db.collection('seasons').doc('season').collection('stats').doc(player.id).set({
                    name: player.name+" "+player.lastname,
                    avg: 0,
                    hr: 0,
                    rbi: 0,
                    r: 0,
                    h: 0,
                    b2: 0,
                    b3: 0,
                    g: 0,
                    ab: 0,
                    bb: 0,
                    so: 0
                })
            })
        }
        setPlayerStats()
       // eslint-disable-next-line
    },[players])
    return (
    <>
        <Link to={"/season"}><BackIconImg src={backIcon} alt=""/></Link>
        <Container>
            <Box>
                <h2>Stats:</h2>
                <select>
                    <option value="avg">AVG</option>
                    <option value="hr">HR</option>
                    <option value="rbi">RBI</option>
                    <option value="r">R</option>
                    <option value="h">H</option>
                    <option value="b2">2B</option>
                    <option value="b3">3B</option>
                    <option value="g">G</option>
                    <option value="ab">AB</option>
                    <option value="bb">BB</option>
                    <option value="so">SO</option>
                </select>
                <ul>
                    {players.map((player,index)=>(<StatsList player={player} index={index} />))}
                </ul>
            </Box>
        </Container>
        
    </>
    );
};

export default Stats;


// const handleChange = (e) =>{
//     if(e.target.name ==="name" || e.target.name ==="position"){
//         setInfo({
//             ...info,
//             [e.target.name]: e.target.value
//         })
//     }else{
//         setInfo({
//             ...info,
//             [e.target.name]: parseInt(e.target.value)
//         })
//     }

// }