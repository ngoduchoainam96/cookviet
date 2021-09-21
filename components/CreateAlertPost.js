import React, { useState } from 'react';
import fire from '../config/fire-conf.js';
import styles from '../styles/Home.module.css'

const storage = fire.storage();
const CreateAlertPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');
  const [url, setUrl] = useState('');
  const [img,setImg]=useState(null);
  const handleSubmit = (event) => {
    document.getElementById('text').innerHTML+="<br />";
    event.preventDefault();
    fire.firestore()
      .collection('alert_post')
      .add({
        title: title,
        content: content,
      });
    setTitle('');
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
                .collection('alert')
                .add({
                  title:title,
                  imgURL:url,
                  createdAt: fire.firestore.FieldValue.serverTimestamp(),
                  content: content
                })
                .then(() => {
                  alert("Đăng bài thành công")
                })
            })
        });
  }
  return (
    <div>
      <h2>Viết bài</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Tiêu đề<br />
          <input type="text" value={title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Nội dung<br />
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} id="text" className={styles.textarea}/>
        </div>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}>Upload</button>
        <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default CreateAlertPost;