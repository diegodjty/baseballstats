import React,{useState,useContext,useEffect} from 'react';
import Button from '../components/ui/Button';
import {Link } from "react-router-dom";
import Container from './../components/layout/Container';
import styled from '@emotion/styled';
import {FirebaseContext} from '../firebase'

const Box = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2{
        font-size: 2.2rem;
        text-align: center;
        margin: 0;
        margin-top: 10rem;
    }

    .seasonsBtn{
        display: flex;
        flex-grow: 2;
        flex-direction: column;
        justify-content: center;
    }

    .link{
        text-decoration: none;
        color: white;
        margin-bottom: 1rem;
    }
    .season-btn{
        margin-bottom: 1rem;
    }
    a:nth-of-type(4){
       font-size: 1rem;
    }
    .login{
        margin-top: 1rem;
        a{
            text-decoration: none;
            color: red;
        }
    }

`;

const Login = styled.div`
    height: 25px;
    width: 25px;
    position: absolute;
    bottom: 20;
    right: 2;
    opacity: 0;
`;

const SelectSeason = () => {

    const {user,firebase} = useContext(FirebaseContext)
    const[seasons,setSeason] = useState([])


    useEffect(() => {
        const getSeasons = () => {
            firebase.db.collection('seasons').onSnapshot(handelSnapshot)
        }
        getSeasons()
        // eslint-disable-next-line
    }, [])
    
    function handelSnapshot(snapshot){
        const newSeasons = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setSeason(newSeasons)
    }
    return (
        <>
            <Container>
                <Box>
                    <h2>Select Season:</h2>
                    <div className="seasonsBtn">
                        {seasons.map(season=>(
                            <Button key={season.id}>
                                <Link to={"/season"} className="link">{season.year}</Link>
                            </Button>
                        ))}
                    
                    
                    </div>
                    {user && (
                        <Button className="logout" bgColor='true' Tcolor="true" onClick={()=>firebase.logout()}>Logout</Button>
                    )}
                       
                </Box>  
            </Container>
            {!user &&(
                <Login>
                    <Link className="login" to={"/login"}>Login</Link>
                </Login>
            )}
        </>
    );
};

export default SelectSeason;