import fire from '../../config/fire-conf';
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import Head from 'next/head'
import img from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import CreateComment from '../../components/CreateComment'
import Page_header from '../header'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { formatRelative } from "date-fns";

const AlertPost = (props) => {
  const [comments, setComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [show,setShow]=useState(false);
  var star_rating=0;
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
      .collection('comment')
      .where("postname2","==",props.title)
      .onSnapshot(snap => {
        const comments = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(comments);
      });
  }, []);
  const handleStar1 = () => {
    star_rating = 1;
    document.getElementById("star_point").innerHTML=star_rating;
  }
  //  <button onClick={handleStar1}>1 sao</button><button >2 sao</button><button>3 sao</button><button>4 sao</button><button>5 sao</button>
   // <div>Điểm trung bình: <span id="star_point"></span></div>
   const [content, setContent] = useState('');
   const handleSubmit = (event) => {
    
    event.preventDefault();
    fire.firestore()
      .collection('comment')
      .add({
        title: "Ngô Đức Hoài Nam",
        content: content,
        postname2: props.title,
        createdAt: fire.firestore.FieldValue.serverTimestamp(),       
      });
    setContent('');
    setTimeout(() => {

    }, 2000)
  }
  return (
   
    <div className={styles.body}>
     
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page_header />
      
  
    <div className={styles.alertcontent}>
   
      <h2 className={styles.title}>{props.title}</h2>
      <p>
      <div className={styles.img_content}><img src= {props.imgURL}/></div> 
      </p>
      {props.content}
      <hr/>
      {loggedIn &&     <div className={styles.commentform}>
      <div id="test" ></div>
      <strong>Bình luận</strong>
      <form onSubmit={handleSubmit}>
        
        <div>
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} className={styles.cmtcontent} placeholder="viết bình luận" />
        </div>
        <button type="submit" className={styles.commentsubmit}>Gửi</button>
      </form>
    </div>}
      <ul> 
  {comments.map (comment => 
    <div key = {comment.id}> 
      <b>{comment.title}</b> &nbsp;<br /> 
      {comment.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(comment.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null} <br/>
      {comment.content} &nbsp;
 
    </div> 
  )} 
</ul>
      </div>
    </div>
    
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('alert')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['imgURL'] = result.data().imgURL;
      content['content'] = result.data().content;
    });
return {
    props: {
      title: content.title || null,
      imgURL: content.imgURL || null,
      content: content.content || null
    }
  }
}
export default AlertPost