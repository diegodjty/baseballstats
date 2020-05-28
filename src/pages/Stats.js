import React from 'react';
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import {backIcon} from '../img'
import {Link} from 'react-router-dom'

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
    return (
    <>
        <Link to={"/season"}><BackIconImg src={backIcon} alt=""/></Link>
        <Container>
            <Box>
                <h2>Stats:</h2>
                <select>
                    <option value="G">G</option>
                    <option value="AB">AB</option>
                    <option value="R">R</option>
                    <option value="H">H</option>
                    <option value="2B">2B</option>
                    <option value="3B">3B</option>
                    <option value="HR">HR</option>
                    <option value="RBI">RBI</option>
                    <option value="BB">BB</option>
                    <option value="SO">SO</option>
                </select>
                <table>
                    <tr>
                        <td>1</td>
                        <td>Diego Taveras</td>
                        <td>36</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Diego Taveras</td>
                        <td>36</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Diego Taveras</td>
                        <td>36</td>
                    </tr>
                </table>
            </Box>
        </Container>
        
    </>
    );
};

export default Stats;