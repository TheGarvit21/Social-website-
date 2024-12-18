const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs');

// Route to render the index page
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
    // Fetch multiple random images (e.g., 36 images)
    const images = [];
    for (let i = 0; i < 36; i++) {
      const width = 200;
      const height = 200;
      const imageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
      images.push(imageUrl);
    }

    // Render the ejs view and pass the images array
    res.render('images', { images: images });
  } catch (error) {
    // Handle error if the image fetch fails
    console.error(error);
    res.render('images', { images: [] }); // Empty array if error occurs
  }
});




app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  const {email, password } = req.body;
  console.log(email, password);

  if (email === 'admin@gmail.com' && password === '1234') {
    res.redirect('/')
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/register',(req,res)=>{
  res.render('register');
})

app.post('/register',function(req,res){
  const {username, email,password} = req.body;
  console.log(username,email,password);

  res.redirect('/');
})

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
