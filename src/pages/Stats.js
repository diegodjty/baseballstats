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
    const [select,setSelect] = useState('avg')

    useEffect(() => {
        const getStats = () => {
            firebase.db.collection('seasons').doc('season').collection('stats').orderBy(select,'desc').onSnapshot(handelSnapshot)
        }
        getStats()
        // eslint-disable-next-line
    }, [select])
    
    function handelSnapshot(snapshot){
        const Player = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setPlayers(Player)
    }

    const handelSelect = (e) =>{
        setSelect(e.target.value)
    }
    return (
    <>
        <Link to={"/season"}><BackIconImg src={backIcon} alt=""/></Link>
        <Container>
            <Box>
                <h2>Stats:</h2>
                <select onChange={handelSelect}>
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
                    {players.map((player,index)=>(<StatsList select={select} player={player} index={index} />))}
                </ul>
            </Box>
        </Container>
        
    </>
    );
};

export default Stats;
