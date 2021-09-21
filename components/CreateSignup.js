import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Container, Row} from 'react-bootstrap';
import img from '../pages/img/logo.png'
import img2 from '../pages/img/camera.png'
import img3 from '../pages/img/upload.png'
import Link from 'next/link';


const CreateSignup = () => {
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
    return(
        <div className={styles.body}>
    <div className={styles.header_top}>
      <Container>
      <Head>
        <title>Bài viết</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className={styles.headerleftmenu}>
            <div className={styles.welcomeinfo}>
						  Chào mừng đến với<span> Cookviet</span>
					  </div>

            
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					<div className={styles.header_right_menu}>
						<nav>
							<ul className="list-inline">
								<li><a href="my-account.html" className={styles.a}>Tài khoản</a>&emsp;<a href="registration.html">Đăng nhập</a></li>
								
							</ul>									
						</nav>
					</div>
				</div>
      </Row>
      </Container>
    </div>
    <div className={styles.header_middle}>
      <Container>
        <Row>
        <div className="col-sm-12">
          <div >
						<a href="index.html" className={styles.a}><img className={styles.logo} src={img} alt="bstore logo" /></a>
					</div>
          <div className={styles.header_right_callus}>
						<h3 className={styles.h3}>Thông tin liên hệ: </h3>
						<span>nam96ht@gmail.com</span>
					</div>
          <div className={styles.categorys_product_search}>
							<form action="#" method="get" className={styles.search_form_cat}>
								<div className={styles.search_product_form_group}>
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
										<i className={styles.fa_fa_search} ></i>
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
        <div classname="col-lg-3 col-md-3 col-sm-3 col-xs-12 pull-right shopingcartarea">
          <div className={styles.shopping_cart_out}>
          <div className={styles.shopping_cart}>
								<a className={styles.shop_link} href="cart.html" title="View my shopping cart">
									<i className="fa fa-shopping-cart cart-icon"></i>
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
											<span>2 <span class="pro-quan-x">x</span> <a href="#" className="pro-cat">Watch</a></span>
											<span className={styles.pro_quality}><a href="#">S,Black</a></span>
											<p>$22.95</p>
										</div>
									</div>
									<div className={styles.shipping_item}>
										<span className="cross-icon"><i className="fa fa-times-circle"></i></span>
										<div className={styles.shipping_item_image}>
											<a href="#"><img src="img/shopping-image2.jpg" alt="ảnh món" /></a>
										</div>
										<div className={styles.shipping_item_text}>
											<span>2 <span className={styles.pro_quan_x}>x</span> <a href="#" className={styles.pro_cat}>Women Bag</a></span>
											<span className={styles.pro_quality}><a href="#">S,Gary</a></span>
											<p>$19.95</p>
										</div>
									</div>
									<div className={styles.shipping_total_bill}>
										<div className={styles.cart_prices}>
											<span className={styles.shipping_cost}>$2.00</span>
											<span>Shipping</span>
										</div>
										<div className="total-shipping-prices">
											<span className={styles.shipping_total}>$24.95</span>
											<span>Total</span>
										</div>										
									</div>
									<div className={styles.shipping_checkout_btn}>
										<a href="checkout.html" className={styles.checkout}>Kiểm tra<i className="fa fa-chevron-right"></i></a>
									</div>
								</div>
							</div>
          </div>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 no-padding-right menuarea">
          <div className={styles.mainmenu}>
            <nav>
              <ul className="list-inline mega-menu">
              <li className="active"><a href="index.html" className={styles.a}>Trang chủ</a>
										
										<div className={styles.home_var_menu}>
											<ul className={styles.home_menu}>
												<li><a href="index.html" className={styles.a}>Lựa chọn 1</a></li>
												<li><a href="index-2.html" className={styles.a}>Lựa chọn 2</a></li>
											</ul>												
										</div>
										
									</li>
									<li>
										<a href="shop-gird.html" className={styles.a}>Post bài</a>										
									</li>
              </ul>
            </nav>
          </div>
        </div>
        </Row>
        <Row>
					<div className="col-sm-12 mobile-menu-area">
						<div className="mobile-menu hidden-md hidden-lg" id="mob-menu">
							<span className="mobile-menu-title">MENU</span>
							<nav>
								<ul>							
									<li><PostLink2 id="post" />Post bài</li>
									<li><a href=""> Góc cảnh giác</a></li>
									<li><a href="">Diễn đàn</a></li>
									<li><PostLink id="infor" value="Thongtin" />Thông tin</li>
								</ul>
							</nav>
						</div>						
					</div>
				</Row>
      </Container>
    </div>
	<div className={styles.signup_content}>
    <Container>
        <Row>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			Tên đăng nhập
                  <input></input>
                  </div>
                  </Row>
    </Container>
	<br></br>
    <Container>
        <Row>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			Mật khẩu
                  <input></input>
                  </div>
                  </Row>
    </Container>
	<br></br>
    <Container>
        <Row>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		Nhập lại mật khẩu
                  <input></input>
                  </div>
                  </Row>
    </Container>
	<br></br>
    <Container>
        <Row>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			Email
                  <input></input>
                  </div>
                  </Row>
    </Container>
    Tôi đã đọc và đồng ý sẽ tuân thủ những quy định của Cookviet
    <button className={styles.signup}>Tạo tài khoản</button>
    </div>
    </div>
    )
}

export default CreateSignup;