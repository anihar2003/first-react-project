import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to Our Social Media App!</h1>
      <p>Please log in to see posts and create your own.</p>
      <p>Join the community and share your thoughts!</p>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  );
};

