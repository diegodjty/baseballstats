import React,{useEffect,useContext,useState} from 'react';
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import {backIcon} from '../img'
import {Link} from 'react-router-dom'
import {FirebaseContext} from '../firebase'

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
    .Link{
        text-decoration: none;
        color: rgba(255,0,0)
    }
    a{
        margin-bottom: 20px;
    }

    table{
        margin-top: 2rem;
    }
`;

const Stats = () => {

    const {user,firebase} = useContext(FirebaseContext)
    const [stats,setStats] = useState([])
    useEffect(() => {
        const getStats = () => {
            firebase.db.collection('seasons').doc('season').collection('stats').onSnapshot(handelSnapshot)
        }
        getStats()
        // eslint-disable-next-line
    }, [])
    
    function handelSnapshot(snapshot){
        const NewStats = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setStats(NewStats)
    }

    return (
    <>
        <Link to={"/season"}><BackIconImg src={backIcon} alt=""/></Link>
        <Container>
            <Box>
                <h2>Stats:</h2>
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