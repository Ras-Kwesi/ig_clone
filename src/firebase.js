import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyASut1m-OukFcGMNWl_xMa-zH7LhoQ9Ze8",
    authDomain: "igclone1420.firebaseapp.com",
    projectId: "igclone1420",
    storageBucket: "igclone1420.appspot.com",
    messagingSenderId: "294804623700",
    appId: "1:294804623700:web:c6c96ce6aef80cabb378c1",
    databaseURL: "https://igclone1420.firebaseio.com",
})

const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}

// const firebaseConfig = {
//     apiKey: "AIzaSyASut1m-OukFcGMNWl_xMa-zH7LhoQ9Ze8",
//     authDomain: "igclone1420.firebaseapp.com",
//     projectId: "igclone1420",
//     storageBucket: "igclone1420.appspot.com",
//     messagingSenderId: "294804623700",
//     appId: "1:294804623700:web:c6c96ce6aef80cabb378c1"
// };
