// frontend/src/pages/EditPostPage.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../css/CreatePostPage.css'; // reuse same styles as CreatePostPage

const EditPostPage = () => {
  const { id } = useParams(); // post ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch post data
useEffect(() => {
  if (!user) return; // wait until user is loaded

  setLoading(true);

  API.get(`/posts/${id}`)
    .then(res => {
      const post = res.data;
      if (!post.author || post.author._id !== user._id) {
        setError('You are not authorized to edit this post.');
      } else {
        setTitle(post.title);
        setBody(post.body);
      }
    })
    .catch(() => setError('Post not found.'))
    .finally(() => setLoading(false));
}, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (image) formData.append('image', image);

      await API.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate(`/posts/${id}`); // redirect to post detail page
    } catch (err) {
      console.error(err);
      setError('Failed to update post. Please try again.');
    }
  };

  if (loading) return <p className="loading-text">Loading post...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="create-post-page">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="10"
            required
          />
        </label>

        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <button type="submit" className="submit-btn">Update Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;