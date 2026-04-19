import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../css/CreatePostPage.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <-- New success state
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
    const { data } = await API.post('/posts', fd);
    setSuccess('Post published successfully!'); // show success message
    setTitle('');
    setBody('');
    setImage(null);

    // Redirect to homepage after 2 seconds
    setTimeout(() => {
        navigate('/home'); // <-- go to homepage
    }, 1000);

    } catch (err) {
    setError(err.response?.data?.message || 'Failed to publish post');
    }
  };

  return (
    <div className="create-post-page">
      <div className="post-card">
        <h2>Write a New Post</h2>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>} {/* Show success message */}

        <form onSubmit={handleSubmit} className="post-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your post here..."
            rows={12}
            required
          />

          {user?.role === 'admin' && (
            <div className="file-upload">
              <label>Upload Cover Image (Admin only):</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            </div>
          )}

          <button type="submit">Publish Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;