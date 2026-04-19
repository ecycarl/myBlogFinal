import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import '../css/HomePage.css';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading-text">Loading posts...</p>;

  return (
    <div className="home-page">
      <h2 className="page-title">Latest Posts</h2>

      {/* ✅ Current Logged-in User */}
      {user && (
        <div className="current-user">
            <span>Welcome, {user.name}!</span>
            <img
            src={
                user.profilePic
                ? `http://localhost:5000/uploads/${user.profilePic}`
                : 'http://localhost:5000/uploads/default.jpg'
            }
            alt={user.name}
            className="nav-avatar"
            onError={(e) => {
                e.target.src = 'http://localhost:5000/uploads/default.jpg';
            }}
            />
        </div>
        )}

      {posts.length === 0 ? (
        <p className="no-posts">No posts yet. Be the first to write one!</p>
      ) : (
        <div className="table-wrapper">
          <table className="posts-table">
            <thead>
              <tr className="recent-posts-row">
                <th colSpan="5">Recent Posts</th>
              </tr>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Excerpt</th>
                <th>Author</th>
                <th>Date</th>
                {/*<th>Action</th> {/* New header for Edit button */}
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr
                  key={post._id}
                  style={{
                    backgroundColor:
                      post.author?._id === user?._id
                        ? '#e6f7ff'
                        : 'transparent'
                  }}
                >
                  {/* ✅ Image */}
                  <td>
                    <img
                      src={
                        post.image
                          ? `http://localhost:5000/uploads/${post.image}`
                          : post.author?.profilePic
                          ? `http://localhost:5000/uploads/${post.author.profilePic}`
                          : 'http://localhost:5000/uploads/default.jpg'
                      }
                      alt={post.title || 'Post image'}
                      className="table-post-image"
                      style={{
                        width: '30px',
                        height: '30px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src =
                          'http://localhost:5000/uploads/default.jpg';
                      }}
                    />
                  </td>

                  {/* ✅ Title */}
                  <td>
                    <Link
                      to={`/posts/${post._id}`}
                      className="table-post-title"
                    >
                      {post.title}
                    </Link>
                  </td>

                  {/* ✅ Excerpt */}
                  <td>{post.body.substring(0, 120)}...</td>

                  {/* ✅ Author */}
                  <td>
                    {post.author?._id === user?._id
                      ? 'You'
                      : post.author?.name || 'Unknown'}
                  </td>

                  {/* ✅ Date */}
                  <td>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>

                  {/* Edit button (only for author) 
                    <td>
                    {post.author?._id === user?._id && (
                        <Link to={`/posts/edit/${post._id}`} className="edit-btn">
                        Edit
                        </Link>
                    )}
                    </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;