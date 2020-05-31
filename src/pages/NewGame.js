import React,{useState,useContext,useRef} from 'react';
import styled from '@emotion/styled'
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import {FirebaseContext} from '../firebase'
import {useHistory} from 'react-router-dom'
import PlayerGameInfo from './PlayerGameInfo';

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
    .date{
        width: 100%;
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
        }
    }
    .button{
        margin-top: 1rem;
    }
    label{
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: block;
    }
`

const NewGame = () => {
    //child component state ref
    const playerGameInfoStateRef = useRef(null)

    const [info,setInfo] = useState({
        date: '',
        vsteam: '',
        runs: '',
        hits: '',
        errors: '',
    });
  
    //Function to update state
    const handleChange = (e) =>{
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    
    //useHistory to redirect
    const history = useHistory()

    //Connect to Firebase Context
    const {firebase} = useContext(FirebaseContext)
    const Submit = (e) => {
        e.preventDefault();

        // assign ref state to get current data when user click done
        const params = playerGameInfoStateRef.current

        //Combine child component state with this component state into an object 
        const data = {
            info,
            params
        }
        
        firebase.db.collection('seasons').doc('season').collection('games').add(data)

        // Redirect to games page
        history.push('/games')
    }

    return (
    <Containers>
        <Form>
            <label htmlFor="">Vs Team</label>
            <input type="date"  name="date" onChange={handleChange} className="date" placeholder="Date"/>
                <div className="vs-team">
                    <div className="vs-team-name">
                        <input type="text"  placeholder="Vs Team" name="vsteam"onChange={handleChange}/>
                    </div>
                    <div className="vs-team-final">
                        <input type="number"  name="runs" placeholder="R" onChange={handleChange}/>
                        <input type="number"  name="hits" placeholder="H" onChange={handleChange}/>
                        <input type="number"  name="errors" placeholder="E" onChange={handleChange}/>
                    </div>
                </div>
                <PlayerGameInfo stateRef={playerGameInfoStateRef}/>
            <Button type="submit" onClick={Submit} bgColor="true" className="button">Done</Button>
        </Form>
    </Containers>
    );
};

export default NewGame;