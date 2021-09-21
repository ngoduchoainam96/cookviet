import Toogle from '../../components/Toogle_alert'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import img from '../img/logo.png'
import {Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import fire from '../../config/fire-conf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import CreateComment from '../../components/CreateComment'
import CreateAlertPost from '../../components/CreateAlertPost'
import Page_header from '../header'

export default function CreateAlert(){
  const [comments, setComments] = useState([]);
  const [alert_posts,setAlert_posts] = useState([]);
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
      .collection('alert_post')
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
	  if (typeof window !== "undefined") {
		name = localStorage.getItem('name');
		 fire.auth().onAuthStateChanged(function(user) {
		if (user) {
		  
		  document.getElementById("test").innerHTML= name;
		} else {
		  // No user is signed in.
		}
	  });
	}
    return(
        <div className={styles.body}>
    <div className="body">
        <div className="header_top">
          <Container>
            <Row>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="header_left">
                  <div className="welcome_info">Welcome to<span> Cookviet</span></div>
                  <Toogle />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
		            <div className={styles.header_right}>
                  {notification}
      {!loggedIn 
      ?
        <div>
          <Link href="/user/register">
            <a>Register</a>
          </Link> | 
          <Link href="/user/login" >
            <a>Đăng nhập</a>
          </Link>
        </div>
      :
      <div>
      <button className={styles.myaccount} id="test">Tài khoản</button>
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
									<select name="catsearch" className={styles.cat_search}>
										<option value="">Thực đơn mỗi ngày</option>
										<option value="2">Ăn vặt</option>
										<option value="3">Món cho bé</option>
										<option value="4">Món đãi tiệc</option>
										<option value="5">Ăn chay</option>
										<option value="6">Tết</option>
										<option value="7">Giải nhiệt mùa hè</option>
										<option value="8">Học làm bánh</option>
										<option value="9">Hộp cơm trưa</option>
										<option value="10">Ăn kiêng</option>							
									</select>
									<input type="text" className={styles.form_control_search_form} name="s" placeholder="Nhập tên món ... " />
									<button className={styles.search_button} value="Search" name="s" type="submit">
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
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a href="/">Trang chủ</a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="index.html" >Lựa chọn 1</a></li>
												<li><a href="index-2.html">Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a href="index.html"><PostLink id="Thông tin" value="Thongtin" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="index.html" >Lựa chọn 1</a></li>
												<li><a href="index-2.html" >Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a ><PostLink3 id="Cảnh giác" value="Thongtin" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="index.html" >Lựa chọn 1</a></li>
												<li><a href="index-2.html" >Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a  ><PostLink2 id="Post bài" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="index.html" >Lựa chọn 1</a></li>
												<li><a href="index-2.html" >Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div classname="col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right shopingcartarea">
          <div className={styles.shopping_cart_out}>
          <div className={styles.shopping_cart}>
								<a className={styles.shop_link} href="cart.html" title="View my shopping cart">
									<i className={styles.cart_icon}></i>
									<b>Bài đăng của tôi</b>
									<span className={styles.ajax_cart_quantity}>2</span>
								</a>
								<div className={styles.shipping_cart_overly}>
									<div className={styles.shipping_item}>
										<span className="cross-icon"><i class="fa fa-times-circle"></i></span>
										<div className="shipping-item-image">
											<a href="#"><img src="img/shopping-image.jpg" alt="ảnh món" /></a>
										</div>
										<div className="shipping-item-text">
										</div>
									</div>
									<div className={styles.shipping_item}>
										<span className="cross-icon"><i className="fa fa-times-circle"></i></span>
										<div className={styles.shipping_item_image}>
											<a href="#"><img src="img/shopping-image2.jpg" alt="ảnh món" /></a>
										</div>
										<div className={styles.shipping_item_text}>
										</div>
									</div>
									<div className={styles.shipping_total_bill}>
										<div className={styles.cart_prices}>
											<span className={styles.shipping_cost}>1</span>
											<span>Tổng lượt xem</span>
										</div>
										<div className="total-shipping-prices">
											<span className={styles.shipping_total}>0</span>
											<span>Số lượt yêu thích</span>
										</div>										
									</div>
									<div className={styles.shipping_checkout_btn}>
										<a href="checkout.html" className={styles.checkout}>Kiểm tra<FontAwesomeIcon icon={faChevronRight} className={styles.alert_icon}/></a>
									</div>
								</div>
							</div>
          </div>
        </div>
        </Row>
      </Container>
    </div>
    </div>
    <div className={styles.alerttitle}>
    <ul> 
    {alert_posts.map(alert_post =>
  <li key={alert_post.id}>
    <Link href="/alert_post/[id]" as={'/alert_post/' + alert_post.id}>
      <a>{alert_post.title}</a>
    </Link>
  </li>
)}
</ul>
    {loggedIn && <CreateAlertPost />} 
    </div>
    </div>
    )
}