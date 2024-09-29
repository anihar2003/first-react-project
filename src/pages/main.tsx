import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Post } from '../components/post';
import { Home } from './home'; 
import { auth } from '../config/firebase';

interface Post {
  id: string;
  title: string;
  description: string;
  username: string;
}

export const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const postRef = collection(db, 'posts');

  const onFetchPosts = async () => {
    const data = await getDocs(postRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  };

  useEffect(() => {
    onFetchPosts();
  }, []);


  const isAuthenticated = auth.currentUser !== null;

  return (
    <div className='main'>
      <h1>Home Page</h1>
      
      {!isAuthenticated ? (
        <Home />
      ) : (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              username={post.username}
              title={post.title}
              description={post.description}
              id={post.id}
            />
          ))}
          {posts.length === 0 && <h2>No posts found</h2>}
        </>
      )}
    </div>
  );
};
