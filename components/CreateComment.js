import React, { useState } from 'react';
import fire from '../config/fire-conf.js';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import ImageUpload from './ImgUpload.js'
import styles from '../styles/Home.module.css'

const CreateComment = (props) => {
  var realtime = Date().toLocaleString();
  var name = localStorage.getItem('name');
  const [title, setTitle] = useState(props.title);
  const [time,setTime] = useState(realtime);
  
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    fire.firestore()
      .collection('comment')
      .add({
        title: "Ngô Đức Hoài Nam",
        content: content,
        time: time,
        
      });
    setContent('');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div className={styles.commentform}>
      <div id="test" ></div>
      <h2>Bình luận</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        
        <div>
          Nội dung<br />
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} className={styles.cmtcontent} placeholder="viết bình luận" />
        </div>
        <button type="submit" className={styles.commentsubmit}>Gửi</button>
      </form>
    </div>
  )
}
export default CreateComment;