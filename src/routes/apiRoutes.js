const express = require('express');
const router = express.Router();



// Import the necessary models
const User = require('../models/userModel');
const Thought = require('../models/thoughtModel');

// Middleware to parse the request body
router.use(express.json());

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put('/users/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.userId);

  // Remove the user's associated thoughts
  await Thought.deleteMany({ username: deletedUser.username });

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
  
    const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the index of the friend in the user's friends array
      const friendIndex = user.friends.indexOf(friendId);
  
      // Check if the friend is in the user's friends list
      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found in user\'s friend list' });
      }
  
      // Remove the friend from the user's friend list
      user.friends.splice(friendIndex, 1);
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  

// GET all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(
      req.params.thoughtId
    );
    res.json(deletedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    const updatedThought = await thought.save();
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});







module.exports = router;
