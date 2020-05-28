import React from 'react';
import Button from '../components/ui/Button';
import {Link } from "react-router-dom";
import Container from './../components/layout/Container';
import styled from '@emotion/styled';


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
`;

const SelectSeason = () => {
    return (
            <Container>
                <Box>
                    <h2>Select Season:</h2>
                    <div className="seasonsBtn">
                        <Button><Link to={"/season"} className="link">2020</Link></Button>
                    </div> 
                    <Button bgColor='true' Tcolor="true">New Season</Button>   
                </Box>  
            </Container>
    );
};

export default SelectSeason;