import Head from 'next/head'
import fire from '../../config/fire-conf';
import db from '../../config/fire-conf';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import CreateComment from '../../components/CreateComment'
import Page_header from '../header'
import styles from '../../styles/Home.module.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";

const Blog = (props) => {
  const [comments, setComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [binhluans,setBinhluans]=useState([]);
  const [diemtt,setDiemtt]=useState();
  const [diemtd,setDiemtd]=useState();
  const [alertt,setAlertt]=useState();
  var star_rating=0;
  const handleDelete=()=>{

  }
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
          ...doc.data(),
        }));
        setComments(comments);
      });
  }, []);
  const handleStar1 = () => {
    setDiemtt(1);
    console.log(diemtt)
  }
  const handleStar2 = () => {
    setDiemtt(2);
    console.log(diemtt)
  }
  const handleLike = () =>{
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
   
    document.getElementById('like_button').style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
  }
  
  var diem=0;
  var pn;
  async function local() {
    var url = window.location.href;
    var page = url.substring(url.lastIndexOf('/') + 1);
    fire.firestore()
      .collection('blog')
      .doc(page)
      .update({point: diem + diemtt})
      .then(() => {
        console.log('fuckkkk');
        diem = point;
        
      })
      .catch(function(error) {
      console.error('Error writing document: ', error);
      });
  }
var arr=[];
  var realtime = Date().toLocaleString();
  if (typeof window !== "undefined") {
  var name = localStorage.getItem('name');
  }
  const [title, setTitle] = useState(name);
  const [time,setTime] = useState(realtime);
  if (typeof window !== "undefined") {
    var url = window.location.href;
    var page = url.substring(url.lastIndexOf('/') + 1);
    var pagee = '"'+page+'"';
  }
    const [postname,setPostname]=useState(page);
  
    const [postname2,setPostname2]=useState(props.title);
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');
  const[showcmt,setShowcmt]=useState();
  const handleSubmit = (event) => {
    if(loggedIn==false){
      alert("Bạn phai dang nhap")
    }
   
    event.preventDefault();
    fire.firestore()
      .collection('comment')
      .add({
        title: title,
        content: content,
        time: time,
        postname: postname,
        postname2: postname2
      });
    setContent('');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  async function handleShowcmt() {
    fire.firestore()
      .collection('comment')
      .where("postname2","==",props.title)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
      });
     
      })
      .catch(function(error) {
      console.error('Error writing document: ', error);
      });
  }
  const handleAlert=(event)=>
  {
    event.preventDefault();
    document.getElementById("star_point").innerHTML=alertt;
  }
  /* Hien thi binh luan
   {comments.map(comment =>
            <div key={comment.id}><a><b>{comment.title}</b><br></br>{comment.content}<button>Phản hồi</button></a></div>
                        )} */
  const[reply,setReply]=useState();                   
  const handleReply=(event)=>{
    event.preventDefault();
    fire.firestore()
      .collection('reply')
      .add({
        reply: reply,
      });
    setReply('');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div className={styles.blogcontent}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page_header />
      <div className={styles.blogcontent2}>
      <a href="/">Trang chủ</a>
      <button onClick={handleShowcmt}></button>
      
      <h3 className={styles.blogtitle}>{props.title}</h3>
      <p>
        {props.content}
      </p>
      <p>
       
      </p>
      
      <div>Đánh giá: </div>
      <button className={styles.star_button} onClick={handleStar1}></button>
      <button className={styles.star_button} onClick={handleStar2}></button>
      <button onClick={local} className={styles.star_button}></button>
      <button className={styles.star_button}></button>
      <button className={styles.star_button}></button>
      
      <div>Tổng điểm:{props.point} <span id="star_point"></span></div>
      <button className={styles.like_button} id="like_button" onClick={handleLike}>Like</button>
      <form onSubmit={handleAlert}>
      Đánh giá nhanh: <input value={alertt} onChange={({target}) => setAlertt(target.value)}></input><button type="submit">Đánh giá</button>
      </form>
        <div className={styles.commentform}>
          <h4>Bình luận</h4>
          {notification}
          {loggedIn &&<form onSubmit={handleSubmit}>
            <div>
              Tên sử dụng:<br />
                <input type="text" value={title} onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
              Nội dung<br />
              <textarea value={content} onChange={({target}) => setContent(target.value)} 
              className={styles.cmtcontent} placeholder="Viết bình luận" />
            </div>
            <button type="submit" className={styles.commentsubmit}>Gửi đi</button>
          </form>}
         
                        
                     
        </div>
      </div>
      <div id="doc.id"></div>
      {comments.map(comment =>
            <div key={comment.id}><a><b>{comment.title}</b><br></br>{comment.content}<button onClick={handleReply}>Phản hồi</button><input /></a></div>
                        )}
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
      content['point'] = result.data().point;
    });
return {
    props: {
      title: content.title,
      content: content.content,
      point: content.point || null
    }
  }
}
export default Blog