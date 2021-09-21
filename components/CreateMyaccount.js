import Head from 'next/head'
import Page_header from '../pages/header'
import styles from '../styles/Home.module.css'
import fire from '../config/fire-conf'
import { useState, useEffect } from 'react';

const storage = fire.storage();
const Myaccount =(props) => {
    var name;
  if (typeof window !== "undefined") {
    name = localStorage.getItem('name');
     fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      document.getElementById("name").innerHTML= name;
    } else {
      // No user is signed in.
    }
  });
}
const [id, setId] = useState();
useEffect(() => {
  fire.firestore()
    .collection('user')
    .where("userName","==",mail)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setId(doc.id)
        
    });
   
    })
}, []);
const [avatar, setAvatar] = useState()
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
const [img,setImg]=useState();
const [progress,setProgress]=useState(0);
const [url, setUrl] = useState('');
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
var mail;
    if (typeof window !== "undefined") {
      mail = localStorage.getItem('email');
    }
const [seekit, setSeekit] = useState(false);
const seeKitchen = () =>{
  setSeekit(!seekit);
}
const [kits, setKits] = useState();
useEffect(() => {
     fire.firestore()
 .collection('notes')
 .where("mail","==", mail)
 .onSnapshot(snap => {
   const kits = snap.docs.map(doc => ({
     id: doc.id,
     ...doc.data(),
   }));
   setKits(kits);
 });

}, []);
const test = () => {
  alert(id)
}
    return(
        <div className={styles.body}>
            <Head>
            <title>Tài khoản</title>
        </Head>
        <Page_header />
        <div className={styles.acount_content}>
          <div className={styles.account_header}></div>
          <div ><img src={avatar} /></div>
          { !avatar &&
            <div>
          <div>Bạn chưa có ảnh đại diện?</div>
          <form onSubmit={handleImg}> 
            <input  type="file" onChange={handleChange}/>
            <button type="submit">Cập nhật ảnh</button>
          </form>
          </div>
}
        <b><span id="name"></span></b>
        <div id="email"></div>
        <div>Quốc gia: Việt Nam</div>
    <button><a href="/forum/forum">Tham gia diễn đàn</a></button>
        <button className={styles.chef_page} onClick={seeKitchen}>Xem trang bếp</button><br/><br/>
        <button className="chatbutton"><a href="/message/message">Trò chuyện với mọi người</a></button>
        {
          (mail=="admin@gmail.com") && <button><a href="/admin/admin">Quản lý người dùng</a></button>
        }
        { seekit &&
        <div>
           {kits.map(notes =>
            <span key={notes.id} className={styles.img_post} >
             
                <a title={notes.title}>              
                  <img src={notes.imgURL} className={styles.post_img} />
                  <p>{notes.title}</p>
                </a>
              
            </span> 
)} 
          </div>

        }
        <br></br><br></br>
        <button className="chatbutton"><a href="/repwd/repwd">Đổi mật khẩu</a></button>
        </div>
        </div>
        
    )
}
export default Myaccount;