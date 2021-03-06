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
        <title>Th??ng tin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-10">
          <div className={styles.header_left}>
            <div className={styles.welcome_info}>
						  Ch??o m???ng ?????n v???i<span> Cookviet</span>
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
            <a>????ng k??</a>
          </Link> | 
          <Link href="/user/login">
            <a>????ng nh???p</a>
          </Link>
        </div>
      :
	  <div>
      <button className={styles.myaccount} id="test">T??i kho???n</button>
        <button onClick={handleLogout}>Tho??t</button>
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
						<h5>Th??ng tin li??n h???: </h5>
						<span>nam96ht@gmail.com</span>
					</div>
          <div className={styles.categorys_dish_search}>
							<form action="#" method="get" className={styles.search_form}>
								<div className={styles.search_form_group}>
									<select name="catsearch" className={styles.cat_search}>
										<option value="">Th???c ????n m???i ng??y</option>
										<option value="2">??n v???t</option>
										<option value="3">M??n cho b??</option>
										<option value="4">M??n ????i ti???c</option>
										<option value="5">??n chay</option>
										<option value="6">T???t</option>
										<option value="7">Gi???i nhi???t m??a h??</option>
										<option value="8">H???c l??m b??nh</option>
										<option value="9">H???p c??m tr??a</option>
										<option value="10">??n ki??ng</option>							
									</select>
									<input type="text" className={styles.form_control_search_form} name="s" placeholder="Nh???p t??n m??n ... " />
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
              <li className={styles.active}><a href="/">Trang ch???</a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >L???a ch???n 1</a></li>
												<li><a href="" >L???a ch???n 2</a></li>
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
              <li className={styles.active}><a ><PostLink id="Th??ng tin" value="Thongtin" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >L???a ch???n 1</a></li>
												<li><a href="" >L???a ch???n 2</a></li>
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
              <li className={styles.active}><a ><PostLink3 id="C???nh gi??c" value="Thongtin" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >L???a ch???n 1</a></li>
												<li><a href="" >L???a ch???n 2</a></li>
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
              <li className={styles.active}><a ><PostLink2 id="Post b??i" /></a>
										
										<div className={styles.home_var_menu}>
											<ul className="home-menu">
												<li><a href="" >L???a ch???n 1</a></li>
												<li><a href="" >L???a ch???n 2</a></li>
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
								<a className={styles.shop_link} href="" title="Xem th??ng tin b??i vi???t">
									<i className={styles.cart_icon}></i>
									<b>B??i ????ng c???a t??i</b>
									<span className={styles.ajax_cart_quantity}>2</span>
								</a>
								<div className={styles.shipping_cart_overly}>
									<div className={styles.shipping_item}>
										<span className="cross-icon"><i class="fa fa-times-circle"></i></span>
										<div className="shipping-item-image">
											<a href="#"><img src="img/shopping-image.jpg" alt="???nh m??n" /></a>
										</div>
										<div className="shipping-item-text">
										</div>
									</div>
									<div className={styles.shipping_item}>
										<span className="cross-icon"><i className="fa fa-times-circle"></i></span>
										<div className={styles.shipping_item_image}>
											<a href="#"><img src="img/shopping-image2.jpg" alt="???nh m??n" /></a>
										</div>
										<div className={styles.shipping_item_text}>
										</div>
									</div>
									<div className={styles.shipping_total_bill}>
										<div className={styles.cart_prices}>
											<span className={styles.shipping_cost}>1</span>
											<span>T???ng l?????t xem</span>
										</div>
										<div className="total-shipping-prices">
											<span className={styles.shipping_total}>0</span>
											<span>S??? l?????t y??u th??ch</span>
										</div>										
									</div>
									<div className={styles.shipping_checkout_btn}>
										<a href="checkout.html" className={styles.checkout}>Ki???m tra<FontAwesomeIcon icon={faChevronRight} className={styles.alert_icon}/></a>
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
							<a href="/">Trang ch???</a>
							<span><FontAwesomeIcon icon={faCaretRight} className={styles.row_icon} /></span>
							<span>Th??ng tin</span>
						</div>
						
					</div>
				</div>
                <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<h2 class={styles.page_title}>V??? ch??ng t??i</h2>
					</div>	
                    <div className="col-lg-4 col-md-4 col-sm-4 col-3">
						
						<div className={styles.single_about_info}>
							<div className="our-company">
								<h3>Website ch??ng t??i</h3>
								
		
								<div class={styles.company_list_menu}>
									<ul >
										<li>B??i vi???t ch???t l?????ng h??ng ?????u</li>
										<li>Ph???c v??? ng?????i d??ng t???t nh???t</li>
										<li>?????m b???o ph???n h???i trong v??ng 1 ng??y</li>
									</ul>
								</div>
							</div>
						</div>
						
					</div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-3">
						<div className={styles.single_about_info}>
							
							<div className="our-team">
								<h3>?????i ng?? ch??ng t??i</h3>
								<p>Trong th???i gian v???a qua, ch??ng t??i ???? lao ?????ng ng??y ????m ????? ????a ?????n cho ng?????i d??ng s???n ph???m, d???ch v??? t???t nh???t</p>
								<p>Ch??ng t??i hy v???ng b???n s??? h??i l??ng khi s??? d???ng d???ch v??? c???a Cookviet.vn</p>
								<p>Ch??ng t??i c??ng hy v???ng b???n s??? c?? ?? th???c c???ng ?????ng khi tham gia l??m th??nh vi??n c???a Cookviet</p>	
							</div>
							
						</div>
					</div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
						<div className="single-about-info">
							
							<div className="our-testimonials">
								<h3>Li??n h???</h3>
								
								<div className={styles.single_testimonials}>
									<div className={styles.testimonials_text}>
										<span className="before"></span>
										G???i mail qua ?????a ch???: nam96ht@gmail.com n???u b???n mu???n s??? tr??? gi??p nhanh ch??ng, ho???c g???i: 0342162027 n???u b???n c???n h??? tr??? g???p
										<span className="after"></span>
									</div>
								</div>
								<p>Ng?? ?????c Ho??i Nam, admin Cookviet</p>
								
								<div className={styles.single_testimonials}>
									<div className={styles.testimonials_text}>
										<span className="before"></span>
										T???t c??? c??c b??i ????ng kh??ng ph?? h???p s??? b??? x??a trong v??ng 15 ph??t, v?? m???t c???ng ?????ng y??u n???u ??n l??nh m???nh
										<span className="after"></span>
									</div>
								</div>
								<p>Nam Ng??, moderator Cookviet</p>
								
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
							<h2 className={styles.center_title}>?????i t??c li??n k???t</h2>
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
									<h2>B???n tin</h2>
									<p>????? l???i email ????? nh???n m???i th??ng b??o v?? c???p nh???t</p>
									<form action="#">
										<div className={styles.newsletter_form}>
										  <input type="text" className="form-control newsletter-form" placeholder="Nh???p e-mail c???a b???n" />
										  <input type="submit" className={styles.newsletter_btn} name="submit" value="G???i" />
										</div>
									</form>
								</div>
								
								<div className={styles.fllow_us_area}>
									<h2>Theo d??i ch??ng t??i</h2>
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
											<h2>Th??ng tin</h2>
											<ul>
												<li>
													<div class={styles.info_lefticon}>
														<FontAwesomeIcon icon={faMapMarker} className={styles.infor_icon}/>
													</div>
													<div class={styles.info_text}>
														<p>C??ng ty ch??ng t??i, s??? 58 Tr???n B??nh, C???u Gi???y, H?? N???i </p>
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
												<h2>L??nh v???c</h2>
												<ul>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>???m th???c </a></li>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>Ki???n th???c</a></li>
													<li><a href="shop-gird.html"><i class="fa fa-angle-double-right"></i>M???ng x?? h???i</a></li>
							
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
							<address>Copyright ?? 2015 All Rights Reserved</address>
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
 