import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import img from '../pages/img/logo.png'
import img1 from '../pages/img/mammam.png'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toogle_infor from './Toogle_infor'
import fire from '../config/fire-conf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faMapMarker,faPhone,faEnvelope,faAngleDoubleRight,faAngleDoubleUp,faCaretRight,faShare} from '@fortawesome/free-solid-svg-icons'
import { faHandshake,faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faTwitter,faInstagram,faYoutube } from '@fortawesome/free-brands-svg-icons' 

const CreateInfor = () => {
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
	  const [blogs, setBlogs] = useState([]);
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
    <div className={styles.header_top}>
      <Container>
      <Head>
        <title>Thông tin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-10">
          <div className={styles.header_left}>
            <div className={styles.welcome_info}>
						  Chào mừng đến với<span> Cookviet</span>
					  </div>

					  <Toogle_infor />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-2">
		<div className={styles.header_right}>
      {notification}
      {!loggedIn 
      ?
        <div>
          <Link href="/user/register">
            <a>Đăng ký</a>
          </Link> | 
          <Link href="/user/login">
            <a>Đăng nhập</a>
          </Link>
        </div>
      :
	  <div>
      <button className={styles.myaccount} id="test">Tài khoản</button>
        <button onClick={handleLogout}>Thoát</button>
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
        <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12">
          <div >
						<a href="/"><img className={styles.logo} src={img} alt="bstore logo" /></a>
					</div>
          <div className={styles.header_right_callus}>
						<h5>Thông tin liên hệ: </h5>
						<span>nam96ht@gmail.com</span>
					</div>
          <div className={styles.categorys_dish_search}>
							<form action="#" method="get" className={styles.search_form}>
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
        <div className="col-lg-2 col-md-2 col-sm-2 col-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className={styles.active}><a href="/">Trang chủ</a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >Lựa chọn 1</a></li>
												<li><a href="" >Lựa chọn 2</a></li>
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
              <li className={styles.active}><a ><PostLink id="Thông tin" value="Thongtin" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >Lựa chọn 1</a></li>
												<li><a href="" >Lựa chọn 2</a></li>
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
												<li><a href="" >Lựa chọn 1</a></li>
												<li><a href="" >Lựa chọn 2</a></li>
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
              <li className={styles.active}><a ><PostLink2 id="Post bài" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >Lựa chọn 1</a></li>
												<li><a href="" >Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        <div classname="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <div className={styles.shopping_cart_out}>
          <div className={styles.shopping_cart}>
								<a className={styles.shop_link} href="" title="Xem thông tin bài viết">
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
	<div className={styles.infor_content}>
    <section className={styles.main_content_section}>
    <div className="container">
    <div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					
						<div className={styles.bstore_breadcrumb}>
							<a href="/">Trang chủ</a>
							<span><FontAwesomeIcon icon={faCaretRight} className={styles.row_icon} /></span>
							<span>Thông tin</span>
						</div>
						
					</div>
				</div>
                <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h2 class={styles.page_title}>Về chúng tôi</h2>
					</div>	
                    <div className="col-lg-4 col-md-4 col-sm-4 col-3">
						
						<div className={styles.single_about_info}>
							<div className="our-company">
								<h3>Website chúng tôi</h3>
								
		
								<div class={styles.company_list_menu}>
									<ul >
										<li>Bài viết chất lượng hàng đầu</li>
										<li>Phục vụ người dùng tốt nhất</li>
										<li>Đảm bảo phản hồi trong vòng 1 ngày</li>
									</ul>
								</div>
							</div>
						</div>
						
					</div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-3">
						<div className={styles.single_about_info}>
							
							<div className="our-team">
								<h3>Đội ngũ chúng tôi</h3>
								<p>Trong thời gian vừa qua, chúng tôi đã lao động ngày đêm để đưa đến cho người dùng sản phẩm, dịch vụ tốt nhất</p>
								<p>Chúng tôi hy vọng bạn sẽ hài lòng khi sử dụng dịch vụ của Cookviet.vn</p>
								<p>Chúng tôi cũng hy vọng bạn sẽ có ý thức cộng đồng khi tham gia làm thành viên của Cookviet</p>	
							</div>
							
						</div>
					</div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
						<div className="single-about-info">
							
							<div className="our-testimonials">
								<h3>Liên hệ</h3>
								
								<div className={styles.single_testimonials}>
									<div className={styles.testimonials_text}>
										<span className="before"></span>
										Gửi mail qua địa chỉ: nam96ht@gmail.com nếu bạn muốn sự trợ giúp nhanh chóng, hoặc gọi: 0342162027 nếu bạn cần hỗ trợ gấp
										<span className="after"></span>
									</div>
								</div>
								<p>Ngô Đức Hoài Nam, admin Cookviet</p>
								
								<div className={styles.single_testimonials}>
									<div className={styles.testimonials_text}>
										<span className="before"></span>
										Tất cả các bài đăng không phù hợp sẽ bị xóa trong vòng 15 phút, vì một cộng đồng yêu nấu ăn lành mạnh
										<span className="after"></span>
									</div>
								</div>
								<p>Nam Ngô, moderator Cookviet</p>
								
							</div>
							
						</div>
					</div>
                </div>

    </div>
    </section>
    <section className={styles.brand_client_area}>
    <Container>
    <Row>
	
    <div className={styles.brand_client_row}>
    <div className={styles.center_title_area}>
							<h2 className={styles.center_title}>Đối tác liên kết</h2>
						</div>
                        <div className="col-xs-12">
                        <Row>
                        <div className="client-carousel">
                        <div className="item">
										<div className={styles.single_client}>
											<a href="https://cookpad.com/vn" target="_blank">
											<img className={styles.brand_logo} src={img1} alt="brand-client" />
											</a>
										</div>									
									</div>
                        </div>
                        </Row>
                        </div>
    
	</div>
    </Row>
    </Container>
    </section>
	</div>
    <section className={styles.footer_top_area}>
    <Container>
    <div className={styles.footer_top_container}>
    <Row>
	<div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
							
							<div className={styles.footer_top_left}>
								
								<div className={styles.newsletter_area}>
									<h2>Bản tin</h2>
									<p>Để lại email để nhận mọi thông báo và cập nhật</p>
									<form action="#">
										<div className={styles.newsletter_form}>
										  <input type="text" className="form-control newsletter-form" placeholder="Nhập e-mail của bạn" />
										  <input type="submit" className={styles.newsletter_btn} name="submit" value="Gửi" />
										</div>
									</form>
								</div>
								
								<div className={styles.fllow_us_area}>
									<h2>Theo dõi chúng tôi</h2>
									<ul className={styles.flow_us_link}>
										<li><a href="https://www.facebook.com/Cookvietvn-102832485237285" target="_bank"><FontAwesomeIcon icon={faFacebook} className={styles.facebook}/></a></li>
										<li><a href="https://twitter.com/home" target="_blank"><FontAwesomeIcon icon={faTwitter} className={styles.twitter}/></a></li>
										<li><a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} className={styles.facebook}/></a></li>
										<li><a href="https://www.youtube.com/channel/UC3ZnnW1RPBIl3RWIwVqrGnA"><FontAwesomeIcon icon={faYoutube} className={styles.facebook}/></a></li>
									</ul>
								</div>
								
							</div>
							
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
						<div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
						<div className={styles.footer_top_right_1}>
						<Row>

									<div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
										
										<div class={styles.Store_Information}>
											<h2>Thông tin</h2>
											<ul>
												<li>
													<div class={styles.info_lefticon}>
														<FontAwesomeIcon icon={faMapMarker} className={styles.infor_icon}/>
													</div>
													<div class={styles.info_text}>
														<p>Công ty chúng tôi, số 58 Trần Bình, Cầu Giấy, Hà Nội </p>
													</div>
												</li>
												<li>
													<div class={styles.info_lefticon}>
													<FontAwesomeIcon icon={faPhone} className={styles.infor_icon}/>
													</div>
													<div class="info-text call-lh">
														<p>Call us now : 0123-456-789</p>
													</div>
												</li>
												<li>
													<div class={styles.info_lefticon}>
													<FontAwesomeIcon icon={faEnvelope} className={styles.infor_icon}/>
													</div>
													<div class={styles.info_text}>
														<p>Email : <a href="mailto:nam96ht@gmail.com"><FontAwesomeIcon icon={faAngleDoubleRight} className={styles.row_icon} />nam96ht@gmail.com</a></p>
													</div>
												</li>
											</ul>
										</div>
										
									</div>
						</Row>
						</div>
						<div class={styles.footer_top_right_2}>
						<Row>
						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
										
										<div class={styles.fotter_menu_widget}>
											<div class="single-f-widget">
												<h2>Lĩnh vực</h2>
												<ul>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>Ẩm thực </a></li>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>Kiến thức</a></li>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>Mạng xã hội</a></li>
							
												</ul>
											</div>
										</div>
										
									</div>
						</Row>
						</div>
						</div>
    </Row>
    </div>
    </Container>
	
    </section>
	<footer className={styles.copyright_area}>
			<Container>
				<Row>
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className={styles.copy_right}>
							<address>Copyright © 2015 All Rights Reserved</address>
						</div>
						<div className={styles.scroll_to_top}>
							<a href="#" className={styles.bstore_scrollertop}><FontAwesomeIcon icon={faAngleDoubleUp} className={styles.up_icon}/></a>
						</div>
					</div>
				</Row>
			</Container>
		</footer> 
    </div>
    )
}

export default CreateInfor;
 