const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// DB Connection
const dbURI = '<enter database credentials here';
//const dbURI = '<Enter mongodb database credentials here';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

console.log('connected to db');



// Routes
app.get('/', requireAuth, (req, res) => res.render('index'));
app.use(authRoutes);
