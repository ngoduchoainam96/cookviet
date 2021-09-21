import CreateForum from '../../components/CreateForum';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fire from '../../config/fire-conf'
import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Page_header from '../header'
import { event } from 'jquery';
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { formatRelative } from "date-fns";

export default function Forum() {
    const router = useRouter();
    const [forums, setForums] = useState([]);
  const [notification, setNotification] = useState('');
  const [search,setSearch]=useState();
  const [search0fr, setSearch0fr] = useState("");
  const [searchfrs, setSearchfrs] = useState();
  useEffect(() => {
    fire.firestore()
      .collection('forum')
      .onSnapshot(snap => {
        const forums = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setForums(forums);
      });
  }, []);
 
    console.log(search);
    const [searchconfr, setSearchconfr] = useState(false);
   const handleShowcmt = (event)=> {
    event.preventDefault();
    setSearchconfr(true);
    }
    useEffect(() => {
         fire.firestore()
     .collection('forum')
     //.where("title","==", search)
     .onSnapshot(snap => {
       const searchfrs = snap.docs.map(doc => ({
         id: doc.id,
         ...doc.data(),
       }));
       setSearchfrs(searchfrs);
     });
  
 }, [search]);
 const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            await fire.firestore().collection('forum')
                .orderBy('title')
                .limit(8)
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

    const showNext = ({ item }) => {
        if(list.length === 0) {
            alert("Thats all we have for now !")
        } else {
            const fetchNextData = async () => {
                await fire.firestore().collection('forum')
                    .orderBy('title')
                    .limit(8)
                    .startAfter(item.title)
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
            await fire.firestore().collection('forum')
                .orderBy('title')
                .endBefore(item.title)
                .limitToLast(8)
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
    const [loggedIn, setLoggedIn] = useState(false);
    fire.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
    return (
        <div className={styles.forum_title}>
           <Head>
                <title>Diễn đàn</title>
            </Head>
            <Page_header />
            <div className={styles.forum_page}>
              <div id="timer"></div>
          <div >
          
          <h1>{router.query.id}</h1>
 
       
        
        </div>
        
        <div className={styles.forumtitle}>
          <div className={styles.forum_head}></div>
          <div className={styles.forum_create}>
            {loggedIn && <button className="post_button"><a href="/thread/thread">Đăng bài</a></button>}
          
            <form>
              <input type="text" value={search} id="searchfr"
           onChange={({target}) => setSearch(target.value)} placeholder="Tìm chủ đề ... " />
           <button onClick={handleShowcmt}>Tìm kiếm</button>
           
           <div id="search"></div>
           </form>
           { searchconfr && <div> 
  {searchfrs.map(forum =>
            <span key={forum.id} className={styles.img_post} >
             
                <a title={forum.title}>              
                  <p>{forum.title}</p>
                </a>
              
            </span> 
)} </div>

}
           </div><hr />
           <div className="forumthread">
 {
                //list doc's here
                list.map((doc) => (
                    <div key={doc.key}>
                        <Link href="/forum2/[id]" as={'/forum2/' + doc.key}>
      <a className="forumtitle">{doc.title}
    
      {doc.createdAt?.seconds ? (
                <span className="forumtime">
                  {formatRelative(
                    new Date(doc.createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
      <hr></hr>
  </a>
    
    </Link>
   
                    </div>
                ))
            }
            </div>
            <ButtonGroup>
            {
                //show previous button only when we have items
                page === 1 ? '' : 
                <Button onClick={() => showPrevious({ item: list[0] }) }>Trang trước</Button>
            }
            {
              <Button>{page}</Button>
            }
            {
                //show next button only when we have items
                list.length < 5 ? '' :
                <Button onClick={() => showNext({ item: list[list.length - 1] })}>Trang sau</Button>
            }
            </ButtonGroup>
</div>
</div>
        </div>
        
    )
}