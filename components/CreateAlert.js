import Toogle from './Toogle_alert'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import img from '../pages/img/logo.png'
import {Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import fire from '../config/fire-conf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Alert1 from './alert/alert1'
import CreateComment from './CreateComment'
import CreateAlertPost from './CreateAlertPost'
import Page_header from '../pages/header'
import AlertPost from "../pages/alert_post/[id]"
import { useHistory } from "react-router-dom";
import { useContextualRouting } from 'next-use-contextual-routing';

export default function CreateAlert(){
  const [comments, setComments] = useState([]);
  const [alert_posts,setAlert_posts] = useState([]);
  const [modalOpen,setModalOpen]=useState(false)
  const { makeContextualHref, returnHref } = useContextualRouting();
  useEffect(() => {
    fire.firestore()
      .collection('comment')
      .onSnapshot(snap => {
        const comments = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(comments);
      });
  }, []);
  useEffect(() => {
    fire.firestore()
      .collection('alert')
      .onSnapshot(snap => {
        const alert_posts = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlert_posts(alert_posts);
      });
  }, []);
    const PostLink = props => (
        <li>
          <Link href="/infor/[id]" as={`/infor/${props.id}`}>
            <a>{props.id}</a>
          </Link>
        </li>
      );
      const PostLink2 = props => (
        <li>
          <Link href="/post/[id]" as={`/post/${props.id}`}>
            <a>{props.id}</a>
          </Link>
        </li>
      );
      const PostLink3 = props => (
        <li>
          <Link href="/alert/[id]" as={`/alert/${props.id}`}>
            <a>{props.id}</a>
          </Link>
        </li>
      );
      const [notification, setNotification] = useState('');
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
            setNotification('Logged out')
            setTimeout(() => {
              setNotification('')
            }, 2000)
          });
      }
      var name;
    return(
        <div className={styles.body}>
   <Page_header />
    <div className={styles.alerttitle}>
    {loggedIn && <button><a href="/cralert/cralert">Viết bài</a></button>} <hr/>
    <ul> 
    {alert_posts.map(alert_post =>
  <div key={alert_post.id}>
    <Link href="/alert_post/[id]" as={'/alert_post/' + alert_post.id}>
      <a >{alert_post.title}<hr></hr></a>
    </Link>
  </div>
)}
</ul>
   
    </div>
 
    </div>
    )
}