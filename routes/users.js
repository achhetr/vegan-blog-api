const express = require('express');
const mongoose = require('mongoose');

const {User} = require('../model/users');

const route = express.Router();

route.post('/', async (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.password) 
        return res.status(400).send('Missing Information');

    let result = new User({
        name: req.body.name,
        email: req.body.email
    });

    result.generatePassword(req.body.password);
    
    result = await result.save();
    
    res.send(result);
});



module.exports = route;