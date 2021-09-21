import Head from 'next/head'
import fire from '../../config/fire-conf';
import db from '../../config/fire-conf';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import CreateComment from '../../components/CreateComment'
import Page_header from '../header'
import styles from '../../styles/Home.module.css'
import Regulations from '../regulations';
import Background from '../../styles/reply.png';
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { formatRelative } from "date-fns";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";

const Blog = (props) => {
  var url,page;
  if (typeof window !== "undefined") {
   url = window.location.href; 
     page = url.substring(url.lastIndexOf('/') + 1);}
    const [commentts, setCommentts] = useState([]);
    const[content,setContent]=useState('');
    const [content2, setContent2] = useState('');
    const [reply, setReply]=useState('');
    const[forumname,setForumname]=useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        fire.firestore()
          .collection('commentt')
          .add({
            content: content,
            title: page,
            createdAt: fire.firestore.FieldValue.serverTimestamp(),
            fravatar: avatar
          });
        setContent('');
      }
      const [frpage, setFrpage] = useState(1);
      useEffect(() => {
        const fetchData = async () => {
          await fire.firestore()
          .collection('commentt')
         
          .where("title","==",page)
          .orderBy("createdAt", 'asc')
          .limit(10)
          .onSnapshot(function(querySnapshot) { 
            var items = [];
            querySnapshot.forEach(function(doc) {
                items.push({ key: doc.id, ...doc.data() });
            });
            console.log('first item ', items[0])
            setCommentts(items);
        })
        };
        fetchData();
      }, []);
      const showNext = ({ item }) => {
        if(commentts.length === 0) {
            alert("Thats all we have for now !")
        } else {
            const fetchNextData = async () => {
                await fire.firestore().collection('commentt')
                .where("title","==",page)
                   .orderBy("createdAt",'asc')
                    

                    .limit(10)
                    .startAfter(item.createdAt)
                    .onSnapshot(function(querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function(doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        });
                        setCommentts(items);
                        setFrpage(frpage + 1)
                    })
            };
            fetchNextData();
        }
      };
      const showPrevious = ({item}) => {
        const fetchPreviousData = async () => {
            await fire.firestore().collection('commentt')
            .where("title","==",page)
               .orderBy("createdAt",'asc')
                
                .endBefore(item.createdAt)
                
                .limitToLast(10)
                .onSnapshot(function(querySnapshot) {
                    const items = [];
                    querySnapshot.forEach(function(doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setCommentts(items);
                    setFrpage(frpage - 1)
                })
        };
        fetchPreviousData();
      };
       async function handleShowcmt() {
        var url = window.location.href;
        var page = url.substring(url.lastIndexOf('/') + 1);
        var pagee = '"'+page+'"';
        fire.firestore()
          .collection('comment')
          .where("postname","==","To6Iy1jDg2je6EdK3YG2")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log( doc.data());
          });
          })
          .catch(function(error) {
          console.error('Error writing document: ', error);
          });
      }
      const [forumcon, setForumcon] = useState();
      const handleForumcon = () => {
        setForumcon(true)
      }
      const handleForumrep=(event)=>{
        event.preventDefault();
        fire.firestore()
          .collection('commentt')
          .add({
            content: content2,
            title: page,
            reply: reply,
            createdAt: fire.firestore.FieldValue.serverTimestamp(),
            fravatar: avatar
          });
        setReply('');
        setTimeout(() => {
          
        }, 2000)
      }
      const [isOpen, setIsOpen] = useState(false);
      const togglePopup = (e) => {
        
         setReply(e.target.value)
     
         setIsOpen(!isOpen);
      //  setIsOpen(!isOpen);
      }
      const background = {
        backgroundImage: `url(${Background})`,
      };
      var mail;
    if (typeof window !== "undefined") {
      mail = localStorage.getItem('email');
    }
      const [avatar, setAvatar] = useState();
      useEffect(() => {
        fire.firestore()
          .collection('user')
          .where("userName","==",mail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setAvatar(doc.data().imgURL)
              
          });
         
          })
      }, []);
      const handleChange = e => {
        if (e.target.files[0]) {
          const image1 = e.target.files[0];
          setImg(image1)
        }
      }
      const handleImg = (event) => {
        event.preventDefault();
        const image = img;
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
            (snapshot) => {
              // progrss function ....
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progress);
            },
            (error) => {
                 // error function ....
              console.log(error);
            },
          () => {
            
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          setUrl(url);
      
                      fire
                      .firestore()
                      .collection('user')
                      .doc(id)
                      .update({
                        imgURL:url,               
                      })
                      .then(() => {
                        alert("Cập nhật thành công")
                      })
                  })
              });
      }
      const [countnotes, setCountnotes] = useState();
const [aa, setAa] = useState();
const test = () => {
  
}
const [loggedIn, setLoggedIn] = useState(false);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  return (
    <div className={styles.forum_main}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page_header />
      <div className={styles.forumcontent}>
      <div id="doc.id"></div>
      <h2>{props.title}</h2>
      <hr className="forumhr"/>
      <p>
        {props.content}<hr></hr>
      </p>
      <p>
        <img src={props.img} className="forumimg"/>
      </p>
      
      {commentts.map(commentt =>
  <div key={commentt.id}>
    
    <a>
      <div className="repformtotal">
        <div>
          <div class="about-wrapper" onMouseEnter={test}>
            <img src={commentt.fravatar} className="frimg"/>
            <div className="hide" >
            <div class="avatar-frame">
              <img src={commentt.fravatar} className="frimg"/>
              </div>
              {commentt.userName0}<br/>Thành viên
              <button value={commentt.userName0} id="forumname"></button>
              <div>Ngày gia nhập: </div>
              </div>
          </div>
           {commentt.userName0}
         </div>
      
    <div id="frcontent">
    {commentt.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(commentt.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
              <hr/>
    <div className="replyform">
    
      {commentt.reply}</div>{commentt.content}  
    <form onSubmit={handleForumrep}>
    <div><input type="button" value={commentt.content} onClick={togglePopup} style={{ ...background }} className="noText" 
    title="Phản hồi"
    />
    {isOpen && <Regulations
      content={<>
      <div className="replyform">{reply}</div>
       <input type="text" value={content2} onChange={({target}) => setContent2(target.value)}/>
        <button type="submit" className="okbutton">Đăng phản hồi</button>
      </>}
      handleClose={togglePopup}
    />}</div>
    </form>
    </div>
    < hr/>
    </div>
    </a>
    </div>
  
)}

      <ButtonGroup>
            {
                //show previous button only when we have items
                frpage === 1 ? '' : 
                <Button onClick={() => showPrevious({ item: commentts[0] }) }>Trang trước</Button>
            }
            {
              <Button>{frpage}
              </Button>
            }
            {
                //show next button only when we have items
                commentts.length < 10 ? '' :
                <Button onClick={() => showNext({ item: commentts[commentts.length - 1] })}>Trang sau</Button>
            }
            </ButtonGroup>
            < hr />
            <div className="repformtotal">
              <div>
            <img src={avatar} className="frimg"/>
            </div>
            { !avatar &&
            <div>
          <div>Bạn chưa có ảnh đại diện?</div>
          <form onSubmit={handleImg}> 
            <input  type="file" onChange={handleChange}/>
            <button type="submit">Cập nhật ảnh</button>
          </form>
          </div>
}
<div>
  { loggedIn &&
      <form onSubmit={handleSubmit}>
        <div>
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} placeholder="viết phản hồi" className="repform"/>
        </div>
        <button type="submit" className={styles.forumreply} id="replybutton">Đăng phản hồi</button>
      </form>
}
      </div>
      </div>
      </div>
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('forum')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
      content['img']=result.data().imgURL
    });
return {
    props: {
      title: content.title || null,
      content: content.content || null,
      img: content.img || null
    }
  }
}
export default Blog