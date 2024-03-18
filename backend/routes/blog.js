// routes/blog.js
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

router.post('/create', async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newPost = new BlogPost({
      title,
      description,
      image,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
