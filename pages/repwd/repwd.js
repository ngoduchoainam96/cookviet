import { useState } from 'react';
import fire from '../../config/fire-conf'
import Page_header from '../header';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export default function Repwd() { 
    var user = fire.auth().currentUser;
    const [pwd, setPwd] = useState();
    const router = useRouter();
    const handleClick =() =>
    {
        user.updatePassword(pwd).then(function() {
            // Update successful.
            console.log('updated');
            router.push("/");
          });
        }
    return(
        <div>
            <Page_header />
            <h6>Mật khẩu mới ( đảm bảo ít nhất 6 ký tự )</h6>
<input id="updatePasswordField" class="updatePassword" contenteditable="true" value={pwd} onChange={({target}) => setPwd(target.value)}/><br /><br />
<h6>Xác nhận mật khẩu mới</h6>
<input /><br /><br />
<button id="updatePasswordBtn" className={styles.update_button} onClick={handleClick}>Cập nhật</button>
        </div>
    )
}