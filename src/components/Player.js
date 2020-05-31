import React,{useContext,useState,useEffect} from 'react';
import {FirebaseContext} from './../firebase'
const Player = ({number}) => {

    const{firebase} = useContext(FirebaseContext)
    const [players,setPlayer] = useState([])

    useEffect(() => {
        const getPlayers = () => {
            firebase.db.collection('seasons').doc('season').collection('roster').onSnapshot(handelSnapshot)
        }
        getPlayers()
    }, [])

    function handelSnapshot(snapshot){
        const newPlayer = snapshot.docs.map(doc =>{
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        setPlayer(newPlayer)
    }
    
    return (
    
        <div className="player-box">
            <div className="first-row">
                <input type="number"  name="battingnumber" className="batting-number" value={number}/>
                <select name="name"  className="player-name">
                    <option value="">--Player--</option>
                    {players.map(player=>(
                        <option key={player.id} value="">{player.name}{' '}{player.lastname}</option>
                    ))}
                </select>
                <select name="position" className="position">
                    <option value="">1B</option>
                    <option value="">2B</option>
                    <option value="">3B</option>
                    <option value="">SS</option>
                    <option value="">LF</option>
                    <option value="">CF</option>
                    <option value="">RF</option>
                    <option value="">P</option>
                    <option value="">C</option>
                    <option value="">DH</option>
                    <option value="">A</option>
                </select>
            </div>
            <div className="second-row">
                <input type="number" name="ab" placeholder="AB"/>
                <input type="number" name="r" placeholder="R"/>
                <input type="number" name="h" placeholder="H"/>
            </div>
            <div className="second-row">
                <input type="number" name="2b" placeholder="2B"/>
                <input type="number" name="3b" placeholder="3B"/>
                <input type="number" name="hr" placeholder="HR"/>
            </div>
            <div className="second-row">
                <input type="number" name="rbi" placeholder="RBI"/>
                <input type="number" name="bb" placeholder="BB"/>
                <input type="number" name="so" placeholder="SO"/>
            </div>
        </div>
    );
};

export default Player;