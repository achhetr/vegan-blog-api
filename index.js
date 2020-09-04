const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');
const login = require('./routes/login');
const blog = require('./routes/blog');

mongoose.connect('mongodb://localhost/vegan', 
    {  useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Mongo connected'));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/users',users);
app.use('/api/login',login);
app.use('/api/blog',blog);
app.use('/',(req,res) => {
    res.render('home page');
})

const port = 3000;

app.listen(3000, () => {
    console.log(`Listening to port ${port}`);  
})