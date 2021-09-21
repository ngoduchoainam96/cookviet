import CreateInfor from '../../components/CreateInfor';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export default function Infor() {
    const router = useRouter();
    return (
        <div>
            <h1>{router.query.id}</h1>
            <CreateInfor /> 
            </div>
        
    )
}