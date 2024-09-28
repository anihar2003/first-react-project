import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
    title: string;
    description: string;
}

export const Form = () => {
    const [user] = useAuthState(auth);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description").max(1000, "Description too long, max 1000 characters"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const postref = collection(db, "posts");

    const onSubmit = async (data: FormData) => {
        setLoading(true); // Start loading
        try {
            await addDoc(postref, {
                ...data,
                username: user?.displayName || "Anonymous",
                userId: user?.uid,
            });
            setSuccessMessage("Post submitted successfully!");

            setTimeout(() => {
                setSuccessMessage("");
                reset();
                navigate("/my-posts");
            }, 3000);
        } catch (error) {
            console.error("Error adding post: ", error);
            setSuccessMessage("Error adding post. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input className="input-field" placeholder="Title..." {...register('title')} />
                <p className="error-text">{errors.title?.message}</p>
            </div>
            <div>
                <textarea className="input-field" placeholder="Description..." {...register('description')} />
                <p className="error-text">{errors.description?.message}</p>
            </div>
            <input className="submit-btn" type="submit" value={loading ? "Submitting..." : "Submit"} disabled={loading} />
            {successMessage && <p className="success-text">{successMessage}</p>}
        </form>
    );
};
