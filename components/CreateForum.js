import Page_header from '../pages/header'
import Head from 'next/head'
import { useState } from 'react'; 
import fire from '../config/fire-conf';
import styles from '../styles/Home.module.css'

const storage = fire.storage();
const Forum = () => {
    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');
  const [tag, setTag] = useState();
  const [img,setImg]=useState(null);
      const [url, setUrl] = useState('');
      const today =''+ new Date() ;
  const handleSubmit = (event) => {
    
    event.preventDefault();
    setContent('');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  const handleChange = e => {
    if (e.target.files[0]) {
      const image1 = e.target.files[0];
      setImg(image1)
    }
  }
  const handleUpload = () => {
    const image = img;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
      },
      (error) => {
           // error function ....
        console.log(error);
      },
    () => {
      
  storage.ref('images').child(image.name).getDownloadURL().then(url => {
    console.log(url);
    setUrl({url});

                fire
                .firestore()
                .collection('forum')
                .add({
                  title:title,
                  imgURL:url,
                  time: today, 
                  tag: tag,
                  createdAt: fire.firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                  alert("Đăng bài thành công")
                })
            })
        });
  }
    return(
        <div>
           
            
            <div className={styles.forumtitle}>
      <h2>Tạo chủ đề</h2>
      <hr></hr>
      {notification}
      <form onSubmit={handleSubmit} className="forumform">
      <div>
          
          <input type="text" value={title} className="foruminput"
           onChange={({target}) => setTitle(target.value)} placeholder="Tiêu đề"/>
        </div>
        <div>
          <br />
          <textarea value={content} className="forumcontent"
           onChange={({target}) => setContent(target.value)}  />
        </div>
        <input type="file" onChange={handleChange}/>
               
                <br/>

<img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/> <hr /> 
<span>Thẻ</span><input type="text" value={tag} className="foruminput"
           onChange={({target}) => setTag(target.value)}></input><hr/>
<button onClick={handleUpload} className="postbutton">Đăng chủ đề</button>
      </form>
      </div>
    </div>
    )
}
export default Forum;