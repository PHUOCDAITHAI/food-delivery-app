import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyCn1vwFSR-rhOCkzrvGy4IczGsSY3Iying",
    authDomain: "fooddeliveryapp-d5dfd.firebaseapp.com",
    projectId: "fooddeliveryapp-d5dfd",
    storageBucket: "fooddeliveryapp-d5dfd.appspot.com",
    messagingSenderId: "843305193325",
    appId: "1:843305193325:web:42af413201dbcf64d91464",
    measurementId: "G-8XRPYL17ND"
  };


let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app()
}


// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

export default firebase;