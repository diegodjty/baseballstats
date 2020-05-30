import React,{useContext} from 'react';
import {avatar,deleteIcon} from '../img'
import PlayerContainer from './layout/PlayerContainer';
import swal from 'sweetalert';
import {FirebaseContext} from './../firebase';

const Pitchers = ({player}) => {

    const deletes = () =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this player",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                firebase.db.collection('seasons').doc('season').collection('roster').doc(player.id).delete()
              swal("Player deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    const {firebase} = useContext(FirebaseContext)
    return (
        <PlayerContainer id={player}>
           <div className="player-info">
               <div className="icon">
                   <img src={avatar} alt=""/>
               </div>
               <div className="info">
                    <p>{player.name}{' '}{player.lastname}</p>
                    <p>#{player.number}</p>
                    <p>B/T: {player.bats}{player.catchs}</p>
               </div>
               <img className="delete" src={deleteIcon} onClick={deletes}  alt=""/>
           </div>
        </PlayerContainer>
    );
};

export default Pitchers;