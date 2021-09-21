import ImageUpload from '../../components/CreateImg';
import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter();
    return (
        <div><h1>{router.query.id}</h1>
        <ImageUpload /> 
        </div>
        
    )
}