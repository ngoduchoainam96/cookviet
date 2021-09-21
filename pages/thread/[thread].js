import Head from 'next/head'
import CreateForum from '../../components/CreateForum'
import Page_header from '../header'
import styles from '../../styles/Home.module.css'

export default function Thread() {
    return(
        <div className={styles.thread}>
             <Head>
                <title>Diễn đàn</title>
            </Head>
            <Page_header />
            <CreateForum /> 
            </div>
        
    )
}