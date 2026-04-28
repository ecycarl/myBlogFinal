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

// CORS FIRST
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://my-blog-final-opal.vercel.app',
    'https://my-blog-final-git-main-ecyvill-projects.vercel.app',
    'https://my-blog-final-e4j43zi55-ecyvill-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔥 THIS IS REQUIRED (YOU ARE MISSING THIS)
app.options('*', cors());

// BODY PARSER
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);
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