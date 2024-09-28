import { db } from "../config/firebase";
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../components/post";

interface Post {
    id: string;
    title: string;
    description: string;
    username: string;
}

export const MyPosts = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isEditing, setIsEditing] = useState<string | null>(null);  // For managing edit state
    const [editData, setEditData] = useState<{ title: string, description: string }>({ title: '', description: '' });
    
    const postref = collection(db, "posts");
    const q = query(postref, where("userId", "==", user?.uid));
    
    const onFetchPosts = async () => {
        const data = await getDocs(q);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    };

    const handleDelete = async (postId: string) => {
        await deleteDoc(doc(db, "posts", postId));
        onFetchPosts();  // Refresh the posts after deletion
    };

    const handleEdit = (postId: string, title: string, description: string) => {
        setIsEditing(postId);
        setEditData({ title, description });
    };

    const handleUpdate = async (postId: string) => {
        const postDoc = doc(db, "posts", postId);
        await updateDoc(postDoc, {
            title: editData.title,
            description: editData.description
        });
        setIsEditing(null);
        onFetchPosts();  // Refresh the posts after update
    };

    useEffect(() => {
        onFetchPosts();
    }, []);

    return (
        <div>
            <h1>My Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    {isEditing === post.id ? (
                        <div>
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Title"
                            />
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Description"
                            />
                            <button onClick={() => handleUpdate(post.id)}>Save</button>
                            <button onClick={() => setIsEditing(null)}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <Post
                                username={post.username}
                                title={post.title}
                                description={post.description}
                                id={post.id}
                            />
                            <button onClick={() => handleEdit(post.id, post.title, post.description)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            {posts.length === 0 && <h2>No posts found</h2>}
        </div>
    );
};
