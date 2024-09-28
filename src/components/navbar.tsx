import {Link} from 'react-router-dom';
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import userPlaceholder from '../assets/images/user.png';
import {signOut} from 'firebase/auth';

export const Navbar = () => {
    const [user] =useAuthState(auth);
    const usersignout= async ()=>{
        await signOut(auth);
    }
    return <div className='navbar'>
        <Link to="/">Home</Link>
        <div className='links'>
            {
            user?
            <>
            <Link to="/createpost">createpost</Link>
            <Link to="/my-posts">My Posts</Link>
            <button onClick={usersignout}>Logout</button>
            </>
            :<Link to="/login">Login</Link>
            }
        </div>
        <div className='user'>
        {
            user && 
            <>
            <a>{user?.displayName}</a>
            <img src={user?.photoURL || userPlaceholder} width="100" height="100" />
            </>
        }
        </div>
    </div>
}



