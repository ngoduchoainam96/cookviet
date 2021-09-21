import firebase from 'firebase';
import Rebase from "re-base";
import 'firebase/storage';


  const firebaseConfig = {
    apiKey: "AIzaSyBTmUe1JvCSbswP-VRkqf4Ur6mKEug3p9c",
    authDomain: "cookviet-acb6d.firebaseapp.com",
    projectId: "cookviet-acb6d",
    storageBucket: "cookviet-acb6d.appspot.com",
    messagingSenderId: "216678474881",
    appId: "1:216678474881:web:11b885f157057aeffc5980"
  };
  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  const base = Rebase.createClass(firebase.database());
  const fire = firebase;
  const databaseRef = firebase.database().ref();
  
  export const db = firebase.firestore();
  export { firebaseConfig };
  export default fire;
  export const BrewstrRef = databaseRef.child('ratings');
  export const storage = fire.storage();
  

