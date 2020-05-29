import firebase from 'firebase'

import firebaseConfig from './config';

class Firebase{

    constructor(){
        firebase.initializeApp(firebaseConfig)
        this.auth = firebase.auth()
    }


    //Login
    async login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password)
    }
    // sign out
    async logout(){
        await this.auth.signOut()
    }
}

const firebases = new Firebase();
export default firebases