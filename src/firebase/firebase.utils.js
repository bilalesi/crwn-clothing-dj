import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAubHu5xaQ-6FdcTHNF-YrVa8LD-2BUQg4",
    authDomain: "crwn-prj.firebaseapp.com",
    databaseURL: "https://crwn-prj.firebaseio.com",
    projectId: "crwn-prj",
    storageBucket: "crwn-prj.appspot.com",
    messagingSenderId: "455741203066",
    appId: "1:455741203066:web:5afb74c89e60c3b71ed1c3",
    measurementId: "G-JH62JRPRF7"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;