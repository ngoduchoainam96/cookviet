import { useState, useEffect } from "react";
import Page_header from "../pages/header";
import fire from "../config/fire-conf";
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Regulations from "../pages/regulations";
import Background from '../styles/deluser3.png';
import styles from '../styles/Home.module.css'
import Head from "next/dist/next-server/lib/head";


const MyAdmin = (props) => {
    const [users, setUsers] = useState([]); 
    useEffect(() => {
        fire.firestore()
          .collection('user')
          .onSnapshot(snap => {
            const users = snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setUsers(users);
          });
      }, []);
      const [countnotes, setCountnotes] = useState();
useEffect(() => {
  fire.firestore()
    .collection('user')
    .get()
    .then((querySnapshot) => {
      var counter = 0;
      querySnapshot.forEach((doc) => {
        counter+=1;
    });
   setCountnotes(counter)
    })
}, []);
const [mail, setMail] = useState("");
const handleDeleteUser = (e) => {
  var idd;
  fire.firestore()
    .collection('user')
    .where("userName","==",e.target.value)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
       setId(doc.id);
       fire.firestore()
        .collection('user')
        .doc(doc.id)
        .update({
          delete: "deleted",
        })
        
    });
   
    })
   
     
    
}
const [id, setId] = useState();
 /* useEffect(() => {
  fire.firestore()
    .collection('user')
    .doc(id)
    .update({
      userName: fire.firestore.FieldValue.delete()
    })
}, []); */
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

const [isOpen, setIsOpen] = useState(false);
const test = () => {
  
}
const background = {
  backgroundImage: `url(${Background})`,
};
/*  {isOpen && <Regulations
      content={<>
     <div>Bạn chắc chắn muốn xóa người dùng này?</div><hr/>
     <button>Xóa</button>
      </>}
      handleClose={handleDeleteUser}
    />} */
    return(
        <div className={styles.body}>
          <Head>
            <title>Quản trị viên</title>
          </Head>
          <Page_header />
        <div className={styles.blog_content}>
<TableBody>
<TableRow>
<TableCell>
Tên
</TableCell>
<TableCell>Email</TableCell>
   <TableCell>Xóa</TableCell> 
    
    </TableRow>
    
    {
    users.map(user =>
user.delete?null:
<TableRow key={user.id}   >
  
<TableCell>{user.userName0}</TableCell>

 <TableCell>{user.userName} </TableCell> 
  
  
  <TableCell><input type="button" onClick={handleDeleteUser} value={user.userName} style={{ ...background }} className="noText"></input></TableCell>
    
            </TableRow> 
            )}
    
   </TableBody>
   </div>
        </div>
    )
}
export default MyAdmin;