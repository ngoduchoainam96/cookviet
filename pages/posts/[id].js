import Link from 'next/link';
import Head from 'next/head'
import fire from '../../config/fire-conf';
import styles from '../../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import Toogle from '../toogle'
import img from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight,faangledoubleright } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Page_header from '../header';
import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';



const Notes = (props) => {
  const PostLink = props => (
    <li>
      <Link href="/infor/[id]" as={`/infor/${props.id}`}><a>{props.id}</a></Link>
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
  if (typeof window !== "undefined") {
    var name = localStorage.getItem('name');
    }
    if (typeof window !== "undefined") {
      var url = window.location.href;
      var page = url.substring(url.lastIndexOf('/') + 1);
      var pagee = '"'+page+'"';
    }
    var realtime = Date().toLocaleString();
    const [comments, setComments] = useState([]);
    const [postname,setPostname]=useState(page);
    const [postname2,setPostname2]=useState(props.title);
    const [notification, setNotification] = useState('');
    const [time,setTime] = useState(realtime);
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState(name);
  const [content, setContent] = useState('');
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
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
          postname2: postname2,
        });
      setContent('');
      setTimeout(() => {
        setNotification('')
      }, 2000)
    }
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
    const[reply,setReply]=useState(); 
    
    const handleReply=(event)=>{
      event.preventDefault();
      fire.firestore()
        .collection('reply')
        .add({
          reply: reply,
           idrep: document.getElementById('rep').value,
        });
      setReply('');
      setTimeout(() => {
        setNotification('')
      }, 2000)
    }
    const [replys, setReplys]=useState([]);
    useEffect(() => {
      fire.firestore()
        .collection('reply')
       // .where("idrep","==",document.getElementById('rep').value)
        .onSnapshot(snap => {
          const replys = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReplys(replys);
        });
    }, []);
    const [replycon, setReplycon] = useState(false);
    const handleReplycon = () => {
      setReplycon(true)
    }
    const [author, setAuthor] = useState([]);
    const router = useRouter();
    useEffect(() => {
      var a = document.getElementById('author').value;
      fire.firestore()
      .collection('user')
      .where("userName0","==",a)
      .onSnapshot(snap => {
        const author = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAuthor(author);
      });
    }
    )
    return(
        <div className={styles.body}>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="body">
        <Page_header />
   
        
    <div className={styles.blog_content2}>
    <div className={styles.bstore_breadcrumb}>
							<a href="/">Trang chủ</a>
							<span><FontAwesomeIcon icon={faCaretRight} className={styles.row_icon} /></span>
							<span>Bí quyết nấu ăn</span>
						</div>
    <div className={styles.title}>{props.title}</div>
    <div>Tác giả: <button id="author" value={props.author} style={{display: 'none' }}>{props.author}</button>
    {author.map(user =>
            <span key={user.id}>
              <Link href="/perpage/[id]" as={'/perpage/' + user.id}>
                <a title={user.userName0}>              
                  {user.userName0}
                </a>
              </Link>
            </span> 
)} 
    
    
    </div>
    <div>{props.content}</div>
    <div className={styles.img_content} ><img src={props.imgURL} /></div>
    
    <div className={styles.nguyenlieu}><strong>Nguyên liệu cần chuẩn bị</strong></div>
    <div>{props.title2}</div>
    <div className={styles.step2}><strong>Phần thực hiện</strong></div>
    <span><FontAwesomeIcon icon={faCoffee} className={styles.row_icon} /></span>
    <div>{props.step}</div>
    <span><FontAwesomeIcon icon={faCoffee} className={styles.row_icon} /></span>
    <div>{props.step2}</div>
    
    <div className={styles.commentform}>
          <strong>Bình luận</strong>
          {loggedIn &&<form onSubmit={handleSubmit}>
            <div>
              Tên sử dụng:<br />
                <input type="text" value={title} onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
              <br />
              <textarea value={content} onChange={({target}) => setContent(target.value)} 
              className={styles.cmtcontent} placeholder="Viết bình luận" />
            </div>
            <button type="submit" className={styles.commentsubmit}>Gửi đi</button>
          </form>}
         
                        
                     
        </div>
        {comments.map(comment =>
            <div key={comment.id}><a><b>{comment.title}</b><br></br>{comment.content}
            {loggedIn &&
            <button className={styles.cmt_reply} onClick={handleReplycon}>TRẢ LỜI</button>}
            { replycon &&
            <form onSubmit={handleReply}>
              <input type="text" value={reply} onChange={({target}) => setReply(target.value)}/>
              <input id="rep" value={comment.id}></input>
              <button type="submit"></button>
            </form>
} {replys.map(reply =>

          <div key={reply.id}   >
            {
     (reply.idrep == comment.id) &&
     <div>
            {reply.reply} 
            </div>
            }
            </div>
                        )}


            </a>
           
            </div>
                        )}
                         
                        </div>
             </div>       
        </div>
    )
}
export const getServerSideProps = async ({ query }) => {
    const content = {}
    await fire.firestore()
      .collection('notes')
      .doc(query.id)
      .get()
      .then(result => {
        content['imgURL'] = result.data().imgURL;
        content['title'] = result.data().title;
        content['author'] = result.data().author;
        content['title2'] = result.data().title2;
        content['content'] = result.data().content;
        content['step'] = result.data().step;
        content['step2'] = result.data().step2
      });
    return {
      props: {
        title: content.title,
        imgURL: content.imgURL,
        author: content.author || null,
       title2 : content.title2,
       content: content.content,
       step: content.step || null,
       step2: content.step2 || null
      }
    }
  }
export default Notes