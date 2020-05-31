import React,{useState,useContext} from 'react';
import Container from './../components/layout/Container';
import styled from '@emotion/styled';
import Button from './../components/ui/Button';
import {FirebaseContext} from '../firebase'
import {useHistory} from 'react-router-dom'
import Lineup from '../components/Lineup';

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
    .date{
        width: 100%;
    }
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
    .vs-team{
        border: solid white 1px;
        
        input{
            width: 100%;
            margin: 0;
            &::placeholder{
                text-align: center;
            }
        }
        .vs-team-final{
            display: flex;
        }}
`;


const NewGame = () => {

    const [info,setInfo] = useState({
        date: '',
        vsteam: '',
        runs: '',
        hits: '',
        errors: '',
        battingnumber: '',
        name:'',
        position: '',
        ab: '',
        r: '',
        h:'',
        b2: '',
        b3: '',
        hr: '',
        rbi: '',
        bb: '',
        so: ''
    });
    const {firebase} = useContext(FirebaseContext)
    const history = useHistory()
    const handelChange = (e) =>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    const Submit = (e) => {
        e.preventDefault();
        firebase.db.collection('seasons').doc('season').collection('games').add(info)
        history.push('/games')
    }

    return (
        <Containers>
            <h2>New Game</h2>
            <Form>
                <input type="date" onChange={handelChange} name="date" className="date" placeholder="Date"/>
                <div className="vs-team">
                    <div className="vs-team-name">
                        <input type="text" onChange={handelChange} placeholder="Vs Team" name="vsteam"/>
                    </div>
                    <div className="vs-team-final">
                        <input type="number" onChange={handelChange} name="runs" placeholder="R"/>
                        <input type="number" onChange={handelChange} name="hits" placeholder="H"/>
                        <input type="number" onChange={handelChange} name="errors" placeholder="E"/>
                    </div>
                </div>
                <Lineup  />
                <Button type="submit" onClick={Submit} bgColor="true">Create</Button>
            </Form>
        </Containers>
    );
};

export default NewGame;