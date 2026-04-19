import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MyBlog</h2>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/create-post" style={styles.link}>Write Post</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <Link to="/aboutme" style={styles.link}>About Me</Link>
            <Link to="/contactpage" style={styles.link}>Contact Me</Link>
            <Link to="/mygame" style={styles.link}>Game</Link>

            {/* Show Admin only if role is admin */}
            {user?.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 30px',
    background: '#222',
    color: '#fff',
    alignItems: 'center',
    position: 'fixed',  // <-- fixes it at the top
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,       // <-- ensures it stays above content
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  },
  button: {
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  }
};