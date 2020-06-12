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
        border: solid white 1px;
        padding: 1rem;
    }
    li{
        display: flex;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 0.3rem;
        .quantity{
            margin-left: auto;
        }
    }
    select{
        margin-bottom: 1rem;
    }
    .mini-btn-container{
        .row{
            width: 100%;
            display: flex;

            button{
                width: 25%;
                height: 40px;
                font-weight: 700;
                text-transform: uppercase;
                background-color: #fff;
                border: solid 1px rgba(255, 0, 0, .70) ;
                color: red;
            }
        }
        margin-bottom: 2rem;
    }
`;

const Stats = () => {

    const {firebase} = useContext(FirebaseContext)
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
                <div className="mini-btn-container">
                    <div className="row">
                        <button value="avg" onClick={handelSelect}>AVG</button>
                        <button value="hr" onClick={handelSelect}>HR</button>
                        <button value="rbi" onClick={handelSelect}>RBI</button> 
                        <button value="r" onClick={handelSelect}>R</button>
                    </div>
                     <div className="row">
                        <button value="h" onClick={handelSelect}>H</button> 
                        <button value="b1" onClick={handelSelect}>1B</button> 
                        <button value="b2" onClick={handelSelect}>B2</button> 
                        <button value="b3" onClick={handelSelect}>B3</button> 
                     </div>
                    <div className="row">
                        <button value="g" onClick={handelSelect}>G</button> 
                        <button value="ab" onClick={handelSelect}>AB</button> 
                        <button value="bb" onClick={handelSelect}>BB</button> 
                        <button value="so" onClick={handelSelect}>SO</button> 
                    </div>
                </div>
                <ul>
                    {players.map((player,index)=>(<StatsList key={index} select={select} player={player} index={index} />))}
                </ul>
            </Box>
        </Container>
        
    </>
    );
};

export default Stats;
