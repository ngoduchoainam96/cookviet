import { useState,useEffect } from "react";
import fire from "../../config/fire-conf"
import Page_header from "../header";


const User = (props) => {
    var email;
if (typeof window !== "undefined") {
  email = localStorage.getItem('email');
}
const [id,setId]= useState();
    useEffect(() => {
        fire.firestore()
          .collection('user')
          .where("userName","==",email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setId(doc.id)
              
          });
         
          })
      }, []);
    const handleFollow = () => {
      var username = document.getElementById("username").value;
      fire.firestore()
        .collection('user')
        .where("userName","==",username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             fire.firestore()
        .collection('user')
        .doc(id)
        .update({
          following: doc.data().userName
        })
          })
        }
        )
    }
    return(
        <div>
            <Page_header />
            <img src={props.imgURL} />
            <div id="username" value={props.userName}>{props.userName}</div>
            <button onClick={handleFollow} className="followbutton">Theo dõi</button>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    const content = {}
    await fire.firestore()
      .collection('user')
      .doc(query.id)
      .get()
      .then(result => {
        content['imgURL'] = result.data().imgURL;
        content['mail'] = result.data().userName;
      });
    return {
      props: {
        imgURL: content.imgURL || null,
      }
    }
  }
  export default User