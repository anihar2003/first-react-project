import {auth,provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import  {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const onsignin=async()=>{
        await signInWithPopup(auth,provider);
        navigate("/");
    }
    
    return (
        <div className='login'>
            <p>Sign in with google, continue here</p>
            <button onClick={onsignin}>Sign in with google</button>
        </div>
    );
};