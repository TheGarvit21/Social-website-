const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;
const userModel = require('./usermodel');
const bcrypt = require('bcrypt');
const { hash } = require('crypto');
const morgan = require('morgan');
const fs = require('fs')





const loguser = fs.createWriteStream('log.txt')

app.use(morgan('dev', { stream: loguser }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs');




app.get('/', (req, res) => {
  const posts = [
    { user: 'John Doe', image: '/images/post1.jpg', likes: 120, comments: 8, time: '2 hours ago', description: 'Loving this new platform! 🚀' },
    { user: 'Jane Smith', image: '/images/post2.jpg', likes: 80, comments: 15, time: '5 hours ago', description: 'What an amazing day! ☀️' }
  ];

  const suggestions = [
    { name: 'Alice', username: '@alice123' },
    { name: 'Bob', username: '@bob456' }
  ];

  res.render('index', { posts, suggestions });
});




app.get('/images', async (req, res) => {
  try {
    const images = [];
    for (let i = 0; i < 36; i++) {
      const width = 200;
      const height = 200;
      const imageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
      images.push(imageUrl);
    }
    res.render('images', { images: images });
  } catch (error) {
    console.error(error);
    res.render('images', { images: [] });
  }
});




app.get('/login', (req, res) => {
  res.render('login');
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(400).send('Invalid credentials');
      
      
      res.status(200).redirect('/');
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});





app.get('/register',(req,res)=>{
  res.render('register');
})

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send("Error generating salt");

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Error hashing password");

      try {
        const createdUser = await userModel.create({
          email,
          password: hash,
        });
        res.status(201).redirect('/');
      } catch (error) {
        res.status(500).send("Error saving user");
      }
    });
  });
});







app.get('/messages',(req,res)=>{
  res.render('messages')
})




app.post('/messages',(req,res)=>{
  const {recipient,message} = req.body;
  console.log(recipient,message);
})






app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
