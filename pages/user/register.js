import Head from 'next/head'
import { useState } from 'react'; 
import img from '../img/logo.png'
import fire from '../../config/fire-conf';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import Toogle from '../toogle'
import Home from '../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Component } from 'react';
import Fblogin from './fblogin'
import Page_header from '../header'
import Regulations from '../regulations';

const auth = fire.auth();
const Register = props => {
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
      <Link href="/fblogin/[id]" as={`/fblogin/${props.id}`}>
        <a>{props.id}</a>
      </Link>
    </li>
  );
  const PostLink4 = props => (
    <li>
      <Link href="/alert/[id]" as={`/alert/${props.id}`}>
        <a>{props.id}</a>
      </Link>
    </li>
  );
  const router = useRouter();
  
  const [userName0, setUsername0] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const [notification2, setNotification2] = useState('');
  const [notification0, setNotification0] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification2(
       'Xác nhận mật khẩu không đúng'
      )
      setTimeout(() => {
        setNotification2('')
      }, 4000)
      setPassword('');
      setPassConf('');
      return null;
      }
    if(password.length<6)
    {
      setNotification(
        'Mật khẩu quá ngắn (tối thiểu 6 ký tự)'
       )
       setTimeout(() => {
         setNotification('')
       }, 4000)
       setPassword('');
       setPassConf('');
       return null;
    }
   /* if((userName.match(/@,/g)||[]).length==0)
    {
      setNotification0(
        'Sai định dạng email'
       )
       setTimeout(() => {
         setNotification0('')
       }, 4000)
       setUsername('');
       setPassword('');
       setPassConf('');
       return null;
    } */
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
    router.push("/emailverify/emailverify");
    if (typeof window !== "undefined") {
              var name = document.getElementById('name').value;
              localStorage.setItem('name', name);
         
    }
    if (typeof window !== "undefined") {
      var email = document.getElementById('email').value;
      localStorage.setItem('email', email);
    
  }
    fire
    .firestore()
    .collection('user')
    .add({
      userName0:userName0,
      userName:userName,
      password:password
    })
    }
    const signInWithGoogle = async () => {
      // get the google provider object
      const provider = new fire.auth.GoogleAuthProvider();
      auth.useDeviceLanguage();
      localStorage.setItem('login', 'true');
      // signing in user
      try {
        await auth.signInWithPopup(provider);
        

      } catch (error) {
        console.log(error);
      }
    };
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [check, setCheck] = useState(false);
 
  
  return (
    <div >
      <Head><title>Đăng ký</title></Head>
      <Page_header />
      
	<div className={styles.register_form}>
  <div className={styles.register_content}>
      <h3>TẠO TÀI KHOẢN</h3>
      <form onSubmit={handleLogin} id="contactForm">
      <span className={styles.infor_text}>Tên sử dụng:</span> <input className={styles.infor_text1} type="text" value={userName0} id='name' onChange={({target}) => setUsername0(target.value)}/> 
        <br /><br />
        <span className={styles.infor_text}>Email: </span><input className={styles.infor_text2} type="text" value={userName} id="email"
        onChange={({target}) => setUsername(target.value)} />  <span className={styles.notification0}>{notification0}</span> 
        <br /><br></br>
        <span className={styles.infor_text}>Mật khẩu:</span> <input className={styles.infor_text3} type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> <span className={styles.notification}>{notification}</span> 
        <br /><br />
        <span className={styles.infor_text}>Nhập lại mật khẩu:</span> <input className={styles.infor_text4} type="password" value={passConf}    
        onChange={({target}) => setPassConf(target.value)} /> {notification2}
        <br /><br />
        <button className={styles.fb_button} onClick={signInWithGoogle}>Kết nối với Google</button><br /> <br />
        <div><input
      type="button"
      value="Đọc quy định ở đây"
      onClick={togglePopup}
    />
    {isOpen && <Regulations
      content={<>
        <p>Bạn đồng ý rằng tất cả việc sử dụng Trang web của bạn phải phù hợp với các điều kiện sau: 
          bạn không thể sử dụng Trang web vào bất kỳ mục đích nào bất hợp pháp (ở Việt Nam, 
          quốc gia bạn cư trú và/hoặc quốc gia bạn đang truy cập Trang web) 
          hoặc bị cấm bởi bất kỳ luật hiện hành nào; 
          bạn không thể sao chép, tải xuống, tái sản xuất, tái bản, dựng lên, quảng bá, 
          truyền tải bất kỳ tài liệu nào trên Trang web dưới bất kỳ hình thức nào, 
          ngoại trừ trường hợp hoàn toàn cần thiết đối với việc sử dụng của riêng cá nhân bạn, 
          phi thương mại, hợp pháp, ở nhà, trừ khi có thoả thuận khác bằng văn bản với Cookviet. 
          Bạn không thể, và không được hỗ trợ hoặc tạo điều kiện cho bất kỳ bên thứ ba nào né tránh hay 
          vô hiệu hóa bất kỳ tính năng bảo mật nào của Trang web hoặc tải lên, 
          truyền tải hoặc phân tán bất kỳ virus hoặc mã độc hại nào qua Trang web.</p>
        <button onClick={togglePopup} className="okbutton">OK</button>
      </>}
      handleClose={togglePopup}
    />}</div>
        <input type="checkbox"  id="checkbox" value={check} onChange={({target}) => setCheck(target.value)}/>Tôi đã đọc và đồng ý sẽ tuân thủ những quy định của Cookviet <br></br>
        {check && <button type="submit" className={styles.signup_button}>Đăng ký</button>}
        
        
      </form>
	  </div>
    </div>
    
    </div>
  )
}
export default Register;




