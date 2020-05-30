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
    }
    a:nth-child(3){
       font-size: 1rem;
       margin-bottom: 2rem; 
    }
    a:nth-child(4){
       font-size: 1rem;
    }

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
            <Container>
                <Box>
                    <h2>Select Season:</h2>
                    <div className="seasonsBtn">
                        {seasons.map(season=>(
                            <Button><Link to={"/season"} className="link">{season.year}</Link></Button>
                        ))}
                        
                    </div>
                    {user && (
                        <>
                            <Button bgColor='true' Tcolor="true">New Season</Button>
                            <Button className="logout" bgColor='true' Tcolor="true" onClick={()=>firebase.logout()}>Logout</Button>
                        </>
                    )}
                       
                </Box>  
            </Container>
    );
};

export default SelectSeason;