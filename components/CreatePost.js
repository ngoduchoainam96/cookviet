import React, { useState } from 'react';
import fire from '../config/fire-conf.js';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [point,setPoint]=useState('');
  const [img,setImg] = useState();
  const [notification, setNotification] = useState('');
  const handleImg=()=>{
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
        point: point
      });
    setTitle('');
    setContent('');
    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
      <h2>Add Blog</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Content<br />
          <textarea value={content} 
           onChange={({target}) => setContent(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default CreatePost;