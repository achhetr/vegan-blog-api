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
    res.send(await blog.save());
});

route.put('/:blogId', auth, async (req,res) => {
    const {error} = validateBlog(req.body);
    if(error) return res.status(400).send(error.details[0].message); 
    
    let user = await User.findById(req.body.userId)
    if(!user) return res.status(400).send('Invalid User');

    let blog = await Blog.findById(req.params.blogId);
    if(!blog) return res.status(400).send('Invalid Blog Id');

    blog = await Blog.findByIdAndUpdate(req.params.blogId, {
        user: user,
        _id: blog._id,
        body: req.body.body,
        title: req.body.title
    }, {new: true});

    blog = await blog.save();

    res.send(blog);
});



module.exports = route;

