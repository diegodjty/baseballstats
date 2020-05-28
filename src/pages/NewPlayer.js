import React from 'react';
import Container from './../components/layout/Container';
import styled from '@emotion/styled';
import Button from './../components/ui/Button';

const Containers = styled(Container)`
    h2{
        font-size: 2.2rem;
        text-align: center;
        margin-top: 5rem; 
    }
`;

const Form = styled.form`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input,select{
        /* -webkit-appearance: none; */
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
    
    }
`;

const BatCatch = styled.div`
    display: flex;
    justify-content: space-between;

    select{
        width: 45%;
    }
`;

const NewPlayer = () => {
    return (
        <Containers>
            <h2>New Player</h2>
            <Form>
                <input type="text" placeholder="Name"/>
                <input type="text" placeholder="Last Name"/>
                <input type="text" placeholder="Number"/>
                <select>
                    <option>-Position-</option>
                    <option value="pitcher">Pitcher</option>
                    <option value="catcher">Catcher</option>
                    <option value="infielder">Infielder</option>
                    <option value="outfielder">Outfielder</option>
                </select>
                <BatCatch>
                    <select>
                        <option value="">Bats</option>
                        <option value="R">R</option>
                        <option value="L">L</option>
                    </select>
                    <select>
                        <option value="">Catchs</option>
                        <option value="R">R</option>
                        <option value="L">L</option>
                    </select>
                </BatCatch>
                <Button type="submit" bgColor="true">Create</Button>
            </Form>
        </Containers>
    );
};

export default NewPlayer;