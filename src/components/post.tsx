import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import likedIcon from '/src/assets/images/liked.svg';
import likeIcon from '/src/assets/images/like.svg';


interface PostProps {
    username: string;
    title: string;
    description: string;
    id: string;
}

interface Like {
    userId: string;
}

export const Post = (props: PostProps) => {
    const [user] = useAuthState(auth);
    const likeref = collection(db, "likes");
    const [Likes, setLikes] = useState<Like[]>([]);
    const [noOfLikes, setNoOfLikes] = useState<number>(0);

    const Liketoggle = async () => {
        // Check if the user has already liked the post
        const userLiked = Likes.some((like) => like.userId === user?.uid);
        
        if (userLiked) {
            // User wants to unlike
            const likeToDelete = query(
                likeref, 
                where("userId", "==", user?.uid), 
                where("postId", "==", props.id)
            );
            const result = await getDocs(likeToDelete);
            result.docs.forEach((doc) => deleteDoc(doc.ref));
        } else {
            // User wants to like
            await addDoc(likeref, {
                userId: user?.uid,
                postId: props.id,
            });
        }
        
        // Refresh the likes after toggling
        getLikes(); 
    };

    const getLikes = async () => {
        const q = query(likeref, where("postId", "==", props.id));
        const result = await getDocs(q);
        setLikes(result.docs.map((doc) => ({ userId: doc.data().userId })));
        setNoOfLikes(result.docs.length);
    };

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className='post-card' key={props.id}>
            <h3 className='post-username'>@{props.username}</h3>
            <h2 className='post-title'>{props.title}</h2>
            <p className='post-description'>{props.description}</p>
            <button className='like-button' onClick={Liketoggle}>
                <img 
                    src={Likes.some((like) => like.userId === user?.uid) ? likedIcon : likeIcon} 
                    alt={Likes.some((like) => like.userId === user?.uid) ? 'Unlike' : 'Like'}
                    width="24" 
                    height="24" 
                />
            </button>
            <a className='like-count'>{noOfLikes}</a>
        </div>
    );
};
