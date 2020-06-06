import React,{useState,useContext,useRef,useEffect} from 'react';
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
    const totalRunsStateRef = useRef(null)
    const statsRef = useRef(null)
    const totalHitsStateRef = useRef(null)

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

    const [stat,setStat] = useState([])
    useEffect(() => {
        const getStats = () => {
            firebase.db.collection('seasons').doc('season').collection('stats').onSnapshot(handelSnapshot)
        }
        getStats()
        // eslint-disable-next-line
    }, [])

    function handelSnapshot(snapshot){
        const newStat = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
            
        })
        setStat(newStat)
    }
    
    
    
    //useHistory to redirect
    const history = useHistory()

    //Connect to Firebase Context
    const {firebase} = useContext(FirebaseContext)
    const Submit = (e) => {
        e.preventDefault();

        // assign ref state to get current data when user click done
        const params = playerGameInfoStateRef.current
        const totalR = totalRunsStateRef.current
        const totalH = totalHitsStateRef.current
        const stats = statsRef.current
        //Combine child component state with this component state into an object 
        const data = {
            vsteaminfo: info,
            playerinfo: params,
            totalR,
            totalH
        }
        // firebase.db.collection('seasons').doc('season').collection('games').add(data)
        params.map((player)=>{
            
            if(stat.length!==0){
                stat.map((s)=>{
                    if(player.id===s.id){
                        let newAb=player.ab+s.ab
                        let newR=player.r+s.r
                        let newH=player.h+s.h
                        let newB2=player.b2+s.b2
                        let newB3=player.b3+s.b3
                        let newHr=player.hr+s.hr
                        let newRbi=player.rbi+s.rbi
                        let newBb=player.bb+s.bb
                        let newSo=player.so+s.so
                        firebase.db.collection('seasons').doc('season').collection('stats').doc(player.id).update({
                            ab: newAb,
                            r: newR,
                            h: newH,
                            b2: newB2,
                            b3: newB3,
                            hr: newHr,
                            rbi: newRbi,
                            bb: newBb,
                            so: newSo
                        })
                    }
                })
            }
        })
        console.log('submited');
        
        
        // Redirect to games page
        // history.push('/games')
        


        

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
                <PlayerGameInfo
                    stateRef={playerGameInfoStateRef} 
                    totalRunsStateRef={totalRunsStateRef}
                    totalHitsStateRef={totalHitsStateRef}
                />
            <Button type="submit" onClick={Submit} bgColor="true" className="button">Done</Button>
        </Form>
    </Containers>
    );
};

export default NewGame;