import mongoose from 'mongoose';
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userSchema = new mongoose.Schema({
  user: String,
  // photos: [{ type: String }],
  age: Number,
  sex: String,
  // about_me: String,
  height: Number,
  job: String,
  country: String,
  city: String,
  hobbies: [{ type: String }],
  zodiac_sign: String,
  education: String,
  personality_type: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Endpoint for filtering users
app.get('/api/getFilteredUsers', async (req, res) => {
  try {
    const filters = req.query;

    // Construct the filter object based on available fields
    const filter = {};
    if (filters.age) filter.age = parseInt(filters.age);
    if (filters.sex) filter.sex = filters.sex;
    // Add more fields as needed

    // Query the database with the constructed filter
    const filteredUsers = await User.find(filter);

    res.json(filteredUsers);
  } catch (error) {
    console.error('Error while filtering users', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default mongoose.model('Filter', FilterSchema);