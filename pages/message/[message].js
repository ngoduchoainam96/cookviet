import { useEffect, useState } from "react";
import Link from 'next/link';
import fire from "../../config/fire-conf";
import "firebase/auth";
import "firebase/firestore";
import ChatRoom from "../../Components/MessageRoom";
import styles from '../../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import Toogle from '../toogle'

// initialization
if (!fire.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  });
} else {
  fire.app(); // if already initialized, use that one
}

const auth = fire.auth();
const db = fire.firestore();

export default function Message() {
  // initial states
  const [user, setUser] = useState(() => auth.currentUser);

  // automatically check a user's auth status
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // update the user current state
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // sign in
  const signInWithGoogle = async () => {
    // get the google provider object
    const provider = new fire.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    // signing in user
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  // signout
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    const handleLogout = () => {
    
      fire.auth()
        .signOut()
        .then(() => {
          setNotification('')
          setTimeout(() => {
            setNotification('')
          }, 2000)
        });
    }
  return (
    <div className={styles.body}>
       <div className="header_top">
    </div>
    <div >
      <main>
        {user ? (
          <>
            <ChatRoom user={user} db={db} />
  
          </>
        ) : (
          <section id="sign_in">
            <h1>Chào mừng bạn đến với Phòng trò chuyện</h1>
            <button><a href="/user/login">Đăng nhập bằng tài khoản Cookviet</a></button>
            <button onClick={signInWithGoogle} className={styles.google}>Đăng nhập với Google</button>
          </section>
        )}
      </main>
      </div>
    </div>
  );
}