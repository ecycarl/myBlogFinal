// backend/server.js
require('dotenv').config(); // Load .env variables FIRST
const express =     require('express');
const cors =        require('cors');
const path =        require('path');
const connectDB =   require('./config/db');

// Import routes (you will create these files in the next steps)
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');
const app = express();
connectDB(); // Connect to MongoDB

// ── Middleware ─────────────────────────────────────────────────
// Allow React (port 3000) to call this server
app.use(cors({
origin: [
    'http://localhost:3000',
    'https://my-blog-final-fuzpjzoot-ecyvill-projects.vercel.app',
    'https://my-blog-final-git-main-ecyvill-projects.vercel.app'
],
credentials: true,
}));
// Parse incoming JSON request bodies
app.use(express.json());
// Serve uploaded image files as public URLs
// e.g. http://localhost:5000/uploads/my-image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/posts',       postRoutes);
app.use('/api/comments',    commentRoutes);
app.use('/api/admin',       adminRoutes);
// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Routes FIRST
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "API working fine" });
});

// THEN start server LAST
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});