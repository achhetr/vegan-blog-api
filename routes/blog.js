const express = require('express');

const {Blog, validateBlog} = require('../model/blog');
const {User} = require('../model/users');
const auth = require('../middleware/auth');


const _ = require('lodash');

const route = express.Router();


route.get('/', async (req,res) => {
    const blog = await Blog.find()
                            .sort()
                            .lean();
    res.send(blog);
});

route.post('/', auth, async (req,res) => {
    const {error} = validateBlog(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid User');
    
    const blog = new Blog({
        user: _.pick(user,'_id', 'name', 'email'),
        body: req.body.body,
        title: req.body.title
    }); 
    let check = await blog.save();
    console.log(check, 'checking');
    res.send(check);
});

module.exports = route;

