import React from 'react';
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SelectSeason = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2{
        font-size: 2.2rem;
        text-align: center;
        margin: 0;
    }

    .seasonsBtn{
        display: flex;
        flex-grow: 2;
        flex-direction: column;
        justify-content: center;
    }
    .actionBtn{
    }

`;

const Season = () => {
    return (
        <Container>
            <SelectSeason>
                <h2>Select Season:</h2>
                <div className="seasonsBtn">
                    <Button css={css`margin-bottom: 1rem;`}>2020</Button>
                </div> 
                <Button className="actionBtn" bgColor='true' Tcolor="rgb(255,0,0)">New Season</Button>   
            </SelectSeason>  
        </Container>
    );
};

export default Season;