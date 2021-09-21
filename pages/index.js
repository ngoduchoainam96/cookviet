import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import fire from '../config/fire-conf';
import Chat from './chat'
import Page_header from './header'
import { Helmet } from 'react-helmet'
import Pagination from "react-js-pagination";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { formatRelative } from "date-fns";
// import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export default function Home(props) { 
  const [blogs, setBlogs] = useState([]);
  const [img,setImg]=useState([]);
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
  useEffect(() => {
    fire.firestore()
      .collection('notes')
      .onSnapshot(snap => {
        const img = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImg(img);
      });
  }, []); 
  
  console.log (blogs) 
  const handleLogout = () => {
    
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('')
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
      
     
    } else {
      // No user is signed in.
    }
  });
}
const [activePage,setActivePage]=useState(15);
const [currentPage, setCurrentPage]=useState(1);
const [dbItems, setDbItems]=useState([]);
const [totalItemCount, setTotalItemCount] = useState(1);
const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);

}
const getItems=()=> {
  const startAt = currentPage * 5 - 5;
  const usersQuery = fire.firestore.collection('notes').startAt(startAt).limit(5);
  const snapshot = usersQuery.get();
  const items = snapshot.docs.map(doc => doc.data());
  setDbItems(items);
  setTotalItemCount(fire.firestore.collection('notes').get().then(res => console.log(res.size)))
}
const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
useEffect(() => {
  const fetchData = async () => {
      await fire.firestore().collection('notes')
         .where("field","==","Thực đơn mỗi ngày")
          .orderBy('createdAt', 'desc')
          .limit(7)
          .onSnapshot(function(querySnapshot) { 
              var items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              console.log('first item ', items[0])
              setList(items);
          })
  };
  fetchData();
}, []);
const [snacks, setSnacks] = useState([]);
useEffect(() => {
  const fetchData2 = async () => {
      await fire.firestore().collection('notes')
      .where("field","==","Ăn vặt")
          .orderBy('createdAt', 'desc')
         
          .limit(7)
          .onSnapshot(function(querySnapshot) { 
              var items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              console.log('first item ', items[0])
              setSnacks(items);
          })
  };
  fetchData2();
}, []);
const [baby, setBaby] = useState([]);
useEffect(() => {
  const fetchData2 = async () => {
      await fire.firestore().collection('notes')
      .where("field","==","Món cho bé")
          .orderBy('createdAt', 'desc')
         
          .limit(7)
          .onSnapshot(function(querySnapshot) { 
              var items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              console.log('first item ', items[0])
              setBaby(items);
          })
  };
  fetchData2();
}, []);
const showNext = ({ item }) => {
  if(list.length === 0) {
      alert("Thats all we have for now !")
  } else {
      const fetchNextData = async () => {
          await fire.firestore().collection('notes')
          .where("field","==","Thực đơn mỗi ngày")
              .orderBy('createdAt', 'desc')
             
              .limit(7)
              .startAfter(item.createdAt)
              .onSnapshot(function(querySnapshot) {
                  const items = [];
                  querySnapshot.forEach(function(doc) {
                      items.push({ key: doc.id, ...doc.data() });
                  });
                  setList(items);
                  setPage(page + 1)
              })
      };
      fetchNextData();
  }
};

const showPrevious = ({item}) => {
  const fetchPreviousData = async () => {
      await fire.firestore().collection('notes')
      .where("field","==","Thực đơn mỗi ngày")
          .orderBy('createdAt', 'desc')
         
          .endBefore(item.createdAt)
          .limitToLast(7)
          .onSnapshot(function(querySnapshot) {
              const items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              setList(items);
              setPage(page - 1)
          })
  };
  fetchPreviousData();
};
const showNext2 = ({ item }) => {
  if(list.length === 0) {
      alert("Thats all we have for now !")
  } else {
      const fetchNextData2 = async () => {
          await fire.firestore().collection('notes')
          .where("field","==","Ăn vặt")
              .orderBy('createdAt', 'desc')
              
              .limit(7)
              .startAfter(item.createdAt)
              .onSnapshot(function(querySnapshot) {
                  const items = [];
                  querySnapshot.forEach(function(doc) {
                      items.push({ key: doc.id, ...doc.data() });
                  });
                  setSnacks(items);
                  setPage(page + 1)
              })
      };
      fetchNextData2();
  }
};

const showPrevious2 = ({item}) => {
  const fetchPreviousData2 = async () => {
      await fire.firestore().collection('notes')
      .where("field","==","Ăn vặt")
          .orderBy('createdAt', 'desc')
         
          .endBefore(item.createdAt)
          .limitToLast(7)
          .onSnapshot(function(querySnapshot) {
              const items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              setSnacks(items);
              setPage(page - 1)
          })
  };
  fetchPreviousData2();
};

/*   <div className={styles.blog_content} >
    {img.map(notes =>
            <span key={notes.id} className={styles.img_post} >
              <Link href="/posts/[id]" as={'/posts/' + notes.id}>
                <a title={notes.title}>              
                  <img src={notes.imgURL} className={styles.post_img} />
                  <p>{notes.title}</p>
                </a>
              </Link>
            </span> 
)} 
        </div> */
        const slicedArray = list.slice(0, 1);
const [topage, setTopage] = useState();
const handleTopage = () => {
  fire.firestore().collection('notes')
          .orderBy('createdAt', 'desc')
          .limit(8)
          .onSnapshot(function(querySnapshot) {
              const items = [];
              querySnapshot.forEach(function(doc) {
                  items.push({ key: doc.id, ...doc.data() });
              });
              setList(items);
              setPage(topage)
          })
}
  return (
    <div className={styles.body}>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Trang chủ</title>
    </Helmet>
      <Page_header />
        {dbItems.map((notes) => {
                return (
                    <p key={notes.id}>
                        <b>First Name:</b> {notes.title} <br />
                        
                    </p>
                )
            })
            }
         
            <div className={styles.blog_content} >
            <button className={styles.category}>Thực đơn mỗi ngày</button><br />
            {
                //list doc's here
                list.slice(0,1).map((doc) => (
                    <span key={doc.key} className={styles.img_postone}>
                        <Link href="/posts/[id]" as={'/posts/' + doc.key}>
      <a title={doc.title}>
      <img src={doc.imgURL} className={styles.post_imgone} />
       <p>{doc.title} <br />
       {doc.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(doc.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
       </p>
       
        </a>
    </Link>
                    </span>
                ))
            }
             {
                //list doc's here
                list.slice(1).map((doc) => (
                    <span key={doc.key} className={styles.img_post}>
                        <Link href="/posts/[id]" as={'/posts/' + doc.key}>
      <a title={doc.title}>
      <img src={doc.imgURL} className={styles.post_img} />
       <p>{doc.title}</p> 
       {doc.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(doc.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
       </a>
    </Link>
                    </span>
                ))
            }
            </div> <br></br>
            <div className={styles.pagging}>
            <ButtonGroup>
            {
                //show previous button only when we have items
                page === 1 ? '' : 
                <Button onClick={() => showPrevious({ item: list[0] }) }>Trang trước</Button>
            }
            {
              <Button>{page}
              </Button>
            }
            {
                //show next button only when we have items
                list.length < 5 ? '' :
                <Button onClick={() => showNext({ item: list[list.length - 1] })}>Trang sau</Button>
            }
            </ButtonGroup>
            </div>
            <div className={styles.blog_content} >
            <button className={styles.category}>Ăn vặt</button><br />
            {
                //list doc's here
                snacks.slice(0,1).map((doc) => (
                    <span key={doc.key} className={styles.img_postone}>
                        <Link href="/posts/[id]" as={'/posts/' + doc.key}>
      <a title={doc.title}>
      <img src={doc.imgURL} className={styles.post_imgone} />
       <p>{doc.title} <br />
       {doc.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(doc.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
       </p>
       
        </a>
    </Link>
                    </span>
                ))
                  }
            </div>
            <div className={styles.pagging}>
            <ButtonGroup>
            {
                //show previous button only when we have items
                page === 1 ? '' : 
                <Button onClick={() => showPrevious2({ item: list[0] }) }>Trang trước</Button>
            }
            {
              <Button>{page}
              </Button>
            }
            {
                //show next button only when we have items
                list.length < 5 ? '' :
                <Button onClick={() => showNext2({ item: list[list.length - 1] })}>Trang sau</Button>
            }
            </ButtonGroup>
            </div>
            <div className={styles.blog_content} >
            <button className={styles.category}>Món cho bé</button><br />
            {
                //list doc's here
                baby.slice(0,1).map((doc) => (
                    <span key={doc.key} className={styles.img_post}>
                        <Link href="/posts/[id]" as={'/posts/' + doc.key}>
      <a title={doc.title}>
      <img src={doc.imgURL} className={styles.post_img} />
       <p>{doc.title}</p> 
       {doc.createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(doc.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
       </a>
    </Link>
                    </span>
                ))
            }
            </div>
    </div>
  )
}
