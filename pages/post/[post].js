import CreatePost2 from '../../components/CreatePost2';
import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter();
    return (
        <div><h1>{router.query.id}</h1>
        <CreatePost2 /> 
        </div>
        
    )
}