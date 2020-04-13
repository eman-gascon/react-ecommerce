//Load firebase
import firebase from 'firebase/app';
//Load firestore and auth
import 'firebase/firestore';
import 'firebase/auth';
 
const config = {
    apiKey: "AIzaSyDnzr5YkQ9_NIFLpOhX9KzE-Q6URE4d0VI",
    authDomain: "crwn-db-f928c.firebaseapp.com",
    databaseURL: "https://crwn-db-f928c.firebaseio.com",
    projectId: "crwn-db-f928c",
    storageBucket: "crwn-db-f928c.appspot.com",
    messagingSenderId: "138905785577",
    appId: "1:138905785577:web:7c84507ee6b2c2ca9f8c78",
    measurementId: "G-814XNZ888E"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; 
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set(
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                } )
            } catch (error) 
            {
                console.log('error creating user' , error.message);
            }
        }
        return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

//Load Google Popup
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({promt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
