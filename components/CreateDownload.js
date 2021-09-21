import Page_header from '../pages/header'
import styles from '../styles/Home.module.css'

export default function MyDownload(props) {   
    return (
        <div className={styles.body}>
            <Page_header />
            <div className={styles.download}> 
                <span>Tải ứng dụng Cookviet trên Android để tham gia cộng đồng nấu ăn!</span><br/>
            <button><a><img src="https://static.cookpad.com/global/assets/images/vi/button_google_play_store.svg" /></a></button>
            </div>
           
        </div>
    )
}

