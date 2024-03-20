const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET blog post by their unique id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post method for creating a new blog post
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
