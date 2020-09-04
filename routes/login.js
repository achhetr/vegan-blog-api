const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const {User} = require('../model/users');
const auth = require('../middleware/auth');


const route = express.Router();

const jwtKey = 'jwtKey';

route.get('/', auth, async (req,res) => {
    res.send('Get Login');
});

route.post('/', auth, async (req,res) => {
    console.log(req.body);
    

    if(req.user) {
        return res.send(req.user);
    }

    if(!req.body.email || !req.body.password) 
        return res.status(400).send('Bad Request');
    
    const user = await User.findOne({email: req.body.email});
    
    if(!user) 
        return res.status(404).send('Not Found');
    
        try {
        const result = await bcrypt.compare(req.body.password, user.password)
        
        if(result) {
            // create jwt
            const payload = _.pick(user,'_id','name', 'email');
            const token = jwt.sign(payload, jwtKey);
            res.cookie('x-cookie-auth',token,{ maxAge: 200000, httpOnly: true, secure: true });
            console.log('cookie set but verified by password');
            res.render('createBlog');
            return res.send(payload);
        } else {
            return res.status(401).send('Email or password incorrect');
            
        }
    }
    catch(ex) {
        console.log(ex);    
        return res.status(401).send('Email or password incorrect');
    }
});


module.exports = route;