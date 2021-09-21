import Head from 'next/head'
import img from '../img/logo.png'
import { useState } from 'react';
import fire from '../../config/fire-conf';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake,faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Page_header from '../header';
import Testmodal from '../testmodal/[testmodal]';

const auth = fire.auth();
const Login = () => {
  const PostLink = props => (
    <li>
      <Link href="/[id]" as={`/${props.id}`}>
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  let deleteuser;
  fire.firestore()
  .collection('user')
  .where("userName","==",username)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
      deleteuser= doc.data().delete;
  });
  })
  
  const handleLogin = (e) => {
    e.preventDefault();
   
    if(deleteuser=="deleted") alert ("Nguoi dung da bi xoa")
    else
    {
      fire.auth()
      .signInWithEmailAndPassword(username, password) 
      .then(() => {
        // Signed in 
router.push("/")
        // ...
      })
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification("Thông tin bạn đã nhập không chính xác")
        setTimeout(() => {
          setNotification('')
        }, 4000)
      })
      if (typeof window !== "undefined") {
        var email = document.getElementById('email').value;
        localStorage.setItem('email', email);
      
}
    setUsername('')
    setPassword('')
    }
    
    
  }
  const signInWithGoogle = async () => {
    // get the google provider object
    const provider = new fire.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    // signing in user
    try {
      await auth.signInWithPopup(provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [showPopup,setShowPopup]=useState(false)
  const  togglePopup =()=>{
    setShowPopup(!showPopup)
}
  return (
    <div className={styles.body}>
      
    <div className={styles.header_top}>
      <Container>
      <Head>
        <title>Đăng nhập</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      </Container>
    </div> 
    <Page_header />
	<div className={styles.login_form}>
      <h1>Đăng nhập</h1>
      {notify}
      <form onSubmit={handleLogin}>
        Email<input type="text" value={username} id="email"
        onChange= {({target}) => setUsername(target.value)} />
        <br /><br />
        Mật khẩu: <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
        <br /><br />
        <button onClick={signInWithGoogle}>Kết nối với Google</button><br/><br/>
        <button type="submit" className={styles.update_button}>Đăng nhập</button>
      </form>
	  </div>

    </div>
  )
}
export default Login