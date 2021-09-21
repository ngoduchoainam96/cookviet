import Link from 'next/link';
import { useState, useEffect } from 'react';
import {Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight,faGlobe } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Home.module.css'
import Toogle from './toogle'
import img from './img/logo.png'
import fire from '../config/fire-conf'
import Popup from "reactjs-popup";
import Content from "./Content.js";
import { reducer } from "../store";
import CreatePost2 from '../components/CreatePost2';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton } from 'reactstrap';
import { ButtonDropdown } from 'reactstrap';
// import Blink from 'react-blink-text';

export default function Page_header(props) {
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
    const [notification, setNotification] = useState('');
    
  
     fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      document.getElementById("test").innerHTML= nameshow;
    } else {
      // No user is signed in.
    }
  });
const [search0, setSearch0] = useState("Thực đơn mỗi ngày");
const [searchcon, setSearchcon] = useState(false);
const [searchs, setSearchs] = useState();
let count =0;
const search = (event) => {
  event.preventDefault();
  setSearchcon(true);
 
 count=count+2;
 alert("ban da tim kiem"+search0)
}
const handleChange= (event) =>{
  console.log(event.target.value)
  setSearch0(event.target.value)
}
   useEffect(() => {
     setSearch0(document.getElementById('search').value);
        fire.firestore()
    .collection('notes')
    .where("field","==", search0)
    .onSnapshot(snap => {
      const searchs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchs(searchs);
    });
 
}, [search0]);
const [nameshow, setNameshow] = useState ("");
var email;
if (typeof window !== "undefined") {
  email = localStorage.getItem('email');
}
var login;
if (typeof window !== "undefined") {
  login = localStorage.getItem('login');
}
fire.auth().onAuthStateChanged(function (firebaseUser) {
  if(firebaseUser === null || firebaseUser === undefined) return false
  else {
  if(firebaseUser.emailVerified || login==='true')
  {

  fire.firestore()
    .collection('user')
    .where("userName","==",email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setNameshow(doc.data().userName0)
    });
   
    })
    

  }
}
} )
const [countnotes, setCountnotes] = useState();


  fire.firestore()
    .collection('notes')
    .where("author","==",nameshow)
    .get()
    .then((querySnapshot) => {
      var counter = 0;
      querySnapshot.forEach((doc) => {
        counter+=1;
    });
   setCountnotes(counter)
    })

const [dishname, setDishname] = useState();
const [dish, setDish] = useState();
useEffect(() => {
  setDishname(document.getElementById('dishsearch').value);
     fire.firestore()
 .collection('notes')
// .where("name","==", dishname)
 .onSnapshot(snap => {
   const dish = snap.docs.map(doc => ({
     id: doc.id,
     ...doc.data(),
   }));
   setDish(dish);
 });

}, [dishname]);
const test = () =>{
  alert(countnotes)
}
const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const [notifys, setNotifys] = useState([]);
  useEffect(() => {
       fire.firestore()
   .collection('notes')
   .orderBy('createdAt', 'desc')
   .onSnapshot(snap => {
     const notifys = snap.docs.map(doc => ({
       id: doc.id,
       ...doc.data(),
     }));
     setNotifys(notifys);
   });
  
  }, []);
  /*
          <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
        */
    return(
      <div className="body">
        <div className="header_top">
          <Container>
            <Row>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="header_left">
                  <div className="welcome_info">Chào mừng đến với<span> Cookviet</span></div>
                  <Toogle /> <button className="downloadbtn"><a href="/download/download">Tải Ứng Dụng</a></button>
                </div>
               
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
		            <div className={styles.header_right}>
                  {notification}
      {!loggedIn 
      ?
        <div>
          <Link href="/user/register">
            <a>Đăng ký</a>
          </Link> | 
          <Link href="/user/login" >
            <a>Đăng nhập</a>
          </Link>
        </div>
      :
      <div>
      <a href="/acount/acount"><button className={styles.myaccount} id="test">Tài khoản</button></a>
     <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="globalicon">
      <FontAwesomeIcon icon={faGlobe} className="globalicon2"></FontAwesomeIcon>
      </DropdownToggle>
      <DropdownMenu>

        <div className="blink">Mới</div>
        {notifys.slice(0,1).map(notes =>
            <span key={notes.id} className={styles.img_post} >
             <Link href="/posts/[id]" as={'/posts/' + notes.id}>
                <a title={notes.title}>              
                  <p><img className="imgnotify" src={notes.imgURL} />{notes.title}</p>
                </a>
                </Link>
            </span> 
)}  

      </DropdownMenu>
    </ButtonDropdown>
        <button onClick={handleLogout} className={styles.logoutbutton}>Thoát</button>
        
        </div>
      }
	  </div>
				</div>
      </Row>
        </Container>
    </div>
    <div className={styles.header_middle}>
    
      <Container>
        <Row>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
						<a href="/"><img className={styles.logo} src={img} alt="bstore logo" /></a>
					</div>
          <div className={styles.header_right_callus}>
						<h5>Thông tin liên hệ: </h5>
						<span>nam96ht@gmail.com</span>
					</div>
          <div className={styles.categorys_dish_search}>
							<form action="#" method="get">
								<div className={styles.search_form_group}>
									<select id="search" name="catsearch" className={styles.cat_search} value={search0} onChange={handleChange}>
										<option value="Thực đơn mỗi ngày">Thực đơn mỗi ngày</option>
										<option value="Ăn vặt">Ăn vặt</option>
										<option value="Món cho bé">Món cho bé</option>
										<option value="Món đãi tiệc">Món đãi tiệc</option>
										<option value="Ăn chay">Ăn chay</option>
										<option value="Tết">Tết</option>
										<option value="Giải nhiệt mùa hè">Giải nhiệt mùa hè</option>
										<option value="Học làm bánh">Học làm bánh</option>
										<option value="Hộp cơm trưa">Hộp cơm trưa</option>
										<option value="Ăn kiêng">Ăn kiêng</option>							
									</select>
									<input type="text" id="dishsearch" className={styles.form_control_search_form}  placeholder="Nhập tên món ... " />
									<button className={styles.search_button} value="Search"  onClick={search} >
                  <FontAwesomeIcon icon={faSearch} className={styles.cf}/>
									</button>									 
								</div>
							</form>
						</div>
        </div>
        </Row>
      </Container>
    </div>
    <div className={styles.main_menu_area}>
   
      <Container>
        <Row>
        &emsp;
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a href="/">Trang chủ</a>
										

										
									</li>
              </ul>
            </nav>
          </div>
        </div> &emsp;
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a href="index.html"><PostLink id="Thông tin" value="Thongtin" /></a>
		
										
									</li>
              </ul>
            </nav>
          </div>
        </div> &emsp;
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a ><PostLink3 id="Cảnh giác" value="Thongtin" /></a>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a ><PostLink2 id="Viết món" value="Thongtin" /></a>
										
										
									</li>
              </ul>
            </nav>
          </div>
        </div>

        &emsp;
        <div classname="col-lg-4 col-md-3 col-sm-12 col-xs-12 pull-right shopingcartarea">
          <div className={styles.shopping_cart_out}>
          <div className={styles.shopping_cart}>
								<a className={styles.shop_link} title="Xem trang bếp">
									<i className={styles.cart_icon}></i>
									<b>Bài đăng của tôi</b>
									<span className={styles.ajax_cart_quantity}>{loggedIn?countnotes:0}</span>
								</a>
							</div>
          </div>
        </div>
        </Row>
      </Container>
    </div>
   
      { searchcon && <div> 
  {searchs.map(notes =>
            <span key={notes.id} className={styles.img_post} >
             <Link href="/posts/[id]" as={'/posts/' + notes.id}>
                <a title={notes.title}>              
                  <img src={notes.imgURL} className={styles.post_img} />
                  <p>{notes.title}</p>
                </a>
                </Link>
            </span> 
)} 
</div>}

    </div>
)
    }