import { useEffect, useRef, useState } from "react";
import Head from "next/dist/next-server/lib/head";
import fire from "../config/fire-conf";
import "firebase/firestore";
import { formatRelative } from "date-fns";
import {Container, Row} from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import img from '../pages/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Toogle from "../pages/toogle";
import Page_header from "../pages/header";

export default function ChatRoom(props) {
  // constants
  const db = props.db;
  const dummySpace = useRef();
  //   get user details
  const { uid, displayName, photoURL } = props.user;

  // initial states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // automatically check db for new messages
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(100)
      .onSnapshot((querySnapShot) => {
        // get all documents from collection with id
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        //   update state
        setMessages(data);
      });
  }, [db]);
const [nameshow, setNameshow] = useState();
  // when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      text: newMessage,
      createdAt: fire.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName: nameshow,
      photoURL:avatar,
    });

    setNewMessage("");

    // scroll down the chat
    dummySpace.current.scrollIntoView({ behavor: "smooth" });
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState('');
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    const [avatar, setAvatar] = useState();
    var email;
    if (typeof window !== "undefined") {
      email = localStorage.getItem('email');
    }
    useEffect(() => {
      fire.firestore()
        .collection('user')
        .where("userName","==",email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setAvatar(doc.data().imgURL),
            setNameshow(doc.data().userName0)
        });
       
        })
    }, []);
    const aa = () =>{
      
    }
    
// <button onClick={aa}></button>
  return (
      <div>
        <Head>
          <title>Trò chuyện cộng đồng</title>
        </Head>
        <Page_header />
        
    <Container>
    <nav id="sign_out">
              <h2>Trò chuyện cùng mọi người</h2>
            </nav>
    <main id="chat_room">
      <ul>
        {messages.map((message) => (
          <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
            <section>
              {/* display user image */}
              {message.photoURL ? (
                <img
                  src={message.photoURL}
                  alt="Avatar"
                  width={45}
                  height={45}
                />
              ) : null}
            </section>

            <section>
              {/* display message text */}
              <p>{message.text}</p>

              {/* display user name */}
              {message.displayName ? <span>{message.displayName}</span> : null}
              <br />
              {/* display message date and time */}
              {message.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(message.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
            </section>
          </li>
        ))}
      </ul>

      {/* extra space to scroll the page when a new message is sent */}
      <section ref={dummySpace}></section>

      {/* input form */}
      <form onSubmit={handleSubmit} id="chatform">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Gõ tin nhắn..."
        />

        <button type="submit" disabled={!newMessage}>
          Gửi
        </button>
      </form>
    </main>
    </Container>
    </div>
  );
}