import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {Container, Row} from 'react-bootstrap';
import 'firebase/storage';
import styles from '../styles/Home.module.css'
import img from '../pages/img/logo.png'
import Toogle from '../pages/toogle'
import fire from '../config/fire-conf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Page_header from '../pages/header'
import { Helmet } from 'react-helmet'
import Regulations from '../pages/regulations';

const storage = fire.storage();
const CreatePost2 = () => {
  
    const PostLink = props => (
      <li>
        <Link href="/[id]" as={`/${props.id}`}><a>{props.id}</a></Link>
      </li>
                               );
    const PostLink3 = props => (
      <li>
        <Link href="/alert/[id]" as={`/alert/${props.id}`}><a>{props.id}</a></Link>
      </li>
                               );
     
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
      const [field, setField]= useState("Thực đơn mỗi ngày");
      const [progress,setProgress]=useState(0);
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [title2, setTitle2] = useState('');
      const [ing, setIng] = useState('');
      const [point,setPoint]=useState('');
      const [notification, setNotification] = useState('');
      const [img,setImg]=useState("");
      const [url, setUrl] = useState('');
      const [step,setStep]=useState("");
      const [step2, setStep2]=useState("");
      const [isOpen, setIsOpen] = useState(false);
      const handleSubmit = (event) => {
        event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        field: field,
        title: title,
        content: content,
        point: point,
        title2: title2
      });
    setTitle('');
    setContent('');
    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  let author;
  const handleChange = e => {
    if (e.target.files[0]) {
      const image1 = e.target.files[0];
      setImg(image1)
    }
  }
  const handleUpload = () => {
    fire.firestore().collection('notify').add(
      {
        message:"Đã thêm 1 bài đăng mới"
      }
    )
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
                .collection('notes')
                .add({
                  field: field,
                  title:title,
                  imgURL:url,
                  content:content,
                  title2:title2,
                  ing: ing,
                  step:step,
                  step2: step2,
                  createdAt: fire.firestore.FieldValue.serverTimestamp(),
                  
                })
                .then(() => {
                  alert("Đăng bài thành công")
                  setIsOpen(!isOpen);
                })
            })
        });
  }
  // Ý TƯỞNG PHẦN BÌNH LUẬN VÀ DIỄN ĐÀN: TẠO CSDL BAO GỒM CẢ PHẦN PHẢN HỒI, SAU ĐÓ MAP PHẢN HỒI RA GIAO DIỆN
  // <label for="fusk">Tải ảnh món</label>
  const [addstep, setAddstep] = useState ( false);
  const [addingredient, setAddingredient] = useState(false)
  const handleaddstep = () => {
    setAddstep(true)
  }
  const handleaddingredient = () =>{
    setAddingredient(true)
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
    return(
        <div className={styles.body}>
           <Helmet>
      <meta charSet="utf-8" />
      <title>Viết món mới</title>
    </Helmet>
          <Page_header />
          {loggedIn?
          <div className={styles.post_content}>
           
                  <form onSubmit={handleSubmit}>
                 
                  <div className={styles.img_upload}>
                  
                  <progress value={progress} max="100"/>
                  <input  type="file"  onChange={handleChange}/>
                <br/>

<img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>         
            </div>
 <br></br>
                <div>
                <button onClick={handleUpload} className={styles.postbutton}>Đăng bài</button>
                <select id="search" name="catsearch" className={styles.cat_search2} value={field} onChange={({target}) => setField(target.value)}>
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
									</select> <br /><br />
                      <input type="text" className={styles.title_input} value={title} onChange={({target}) => setTitle(target.value)} placeholder="Tên món: Mỳ tôm"/>
                    </div>
                    <br></br>
                    <div>
                    <textarea value={content} className={styles.title_input}
                      onChange={({target}) => setContent(target.value)} placeholder="Hãy chia sẻ với mọi người về món này" />
                    </div>
                    <br></br><h3><span className={styles.resources}>Nguyên liệu</span></h3>
                    <div>
                      <input type="text" className={styles.title_input} value={title2} onChange={({target}) => setTitle2(target.value)} placeholder="1 gói mỳ"/><br/>
                      {addingredient &&
                    <div>
                     
                      <input type="text" className={styles.title_input} value={ing} onChange={({target}) => setIng(target.value)} placeholder="Gia vị"/>
                    </div> 
}
                      <button className="addstep" onClick={handleaddingredient}>+ Thêm nguyên liệu</button>
                    </div>
                    <br></br><h3><span className={styles.resources}>Các bước</span></h3>
                    <div>
                      <input type="text" className={styles.title_input} value={step} onChange={({target}) => setStep(target.value)} placeholder="Cho mỳ vào tô, sau đó bỏ gia vị"/>
                    </div> 
                    {addstep &&
                    <div>
                     
                      <input type="text" className={styles.title_input} value={step2} onChange={({target}) => setStep2(target.value)} placeholder="Đổ nước và chờ trong 3 phút"/>
                    </div> 
}
                   <button onClick={handleaddstep} className="addstep">+ Thêm bước làm</button>
                    
                  </form>
                 
               
          </div>:<div>Bạn cần đăng nhập</div>
}

        </div>
      )
}
export default CreatePost2;

 