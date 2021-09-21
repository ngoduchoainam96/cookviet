import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import img from '../img/logo.png'
import CreatePost from '../../components/CreatePost';
import {Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';
import fire from '../../config/fire-conf';
import Toogle from '../toogle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Register from '../user/register'
import { Router } from "../../routes";
import styled from "styled-components";
import { isClient, seedGen } from "../../libs/utils";
import { Layout, SingleBox } from "../../components/Layout";
import Setup from "../../components/Setup";
import Chat from '../chat'
import CreatePage from '../../components/PostFinal'
import Page_header from '../header'


export default function Home(props) {
  
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
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [img,setImg]=useState([]);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);
  useEffect(() => {
    fire.firestore()
      .collection('notes')
      .onSnapshot(snap => {
        const img = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImg(img);
      });
  }, []);
  console.log (blogs) 
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
  
  var name;
  if (typeof window !== "undefined") {
    name = localStorage.getItem('name');
     fire.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      // No user is signed in.
    }
  });
}
  
  return (
    <div className={styles.body}>
    <Page_header />
    <div className={styles.blog_content} >
   
 {img.map(notes =>
            <div key={notes.id}>
              <Link href="/notes/[id]" as={'/notes/' + notes.id}><a >{notes.title}<img src={notes.imgURL} /></a></Link>
            </div>
)}
</div>
    <Chat />
    </div>
  )
}
