import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';
import AboutMe from './pages/AboutMe';
import ContactPage from './pages/ContactPage';
import MyGame from './pages/MyGame';
import GameBattlePage from './pages/GameBattlePage';

function App() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = ['/', '/login', '/register'];

  return (
    <>
      {/* Show Navbar only if current path is not in hideNavbarOn */}
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/posts/:id' element={<CreatePostPage />} />
        <Route path="/posts/edit/:id" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/aboutme' element={<ProtectedRoute><AboutMe /></ProtectedRoute>} />
        <Route path='/contactpage' element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        <Route path='/mygame' element={<ProtectedRoute><MyGame /></ProtectedRoute>} />
        <Route path="/game" element={<GameBattlePage />} />
        <Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
         
        <Route path='/admin' element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;