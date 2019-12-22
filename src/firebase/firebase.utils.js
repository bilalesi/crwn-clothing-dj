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

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('userRef : ', userRef)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }catch(error){
            console.log('error adding user', error.message);
        }

    }
    return userRef;

}


// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey);    
//     console.log(collectionRef);

//     const batch = firestore.batch();

//     objectsToAdd.forEach(obj => {
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj)
//     });

//     return await batch.commit();
// }


export const convertCollectionSnapshotTopMap = (collections)=>{
    const transformCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName : encodeURI(title.toLowerCase()),
            id: doc.id, 
            title, 
            items
        }
    })
    return transformCollection.reduce((accumulator, collection) =>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
    
}

export const getCurrentUser = () =>{
    return new Promise(
        (resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(userAuth => {
                unsubscribe();
                resolve(userAuth)
            }, reject)
        }
    )
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle= () => auth.signInWithPopup(googleProvider);




export default firebase;