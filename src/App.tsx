import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Main} from './pages/main'
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import './app.css';
import { MyPosts } from './pages/my-posts';

function App() {
 
  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/my-posts' element={<MyPosts />} />
    </Routes>
  </Router>
  )
}

export default App
