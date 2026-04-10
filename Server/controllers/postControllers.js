const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};