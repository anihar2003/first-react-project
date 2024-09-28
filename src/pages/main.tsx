import {db} from '../config/firebase';
import {collection,getDocs} from 'firebase/firestore';      
import { useState ,useEffect} from 'react';
import { Post } from '../components/post';

interface Post{
    id: string;
    title: string;
    description: string;
    username: string;
}

export const Main = () => {
    const [posts,setPosts] = useState<Post[]>([]);
    const postref = collection(db,"posts");
    const onFetchPosts = async()=>{
        const data = await getDocs(postref);
        setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    }
    useEffect(()=>{
        onFetchPosts();
    },[]);
    return <div className='main'>
        <h1>Home Page</h1>

        {posts.map((post)=>{
            return <Post key={post.id} username={post.username} title={post.title} description={post.description} id={post.id}/>
        })}
        {posts.length === 0 && <h2>No posts found</h2>}
    </div>;
};