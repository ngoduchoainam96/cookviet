import fire from '../../config/fire-conf'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function sendEmailVerification() {

    const [verify, setVerify] = useState(false);
    const router = useRouter();

    fire.auth().onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
          firebaseUser
          .sendEmailVerification()
          .then(function() {

         /*   if (firebaseUser.emailVerified) {
              alert('Email is verified');
              router.push("/");
            } */
           
          }, function(error) {
            // An error happened.
          })
           

        } else {
           
        }
    });
    // [START auth_send_email_verification]
    return(
        <div>
        <div>Một email đã gửi đến bạn, hãy xác thực sau đó bấm vào đây</div>
        <a href="/">Trang chủ</a>
        </div>
    )
}
