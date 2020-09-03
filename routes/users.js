const express = require('express');
const _ = require('lodash');

const {User, validateUser} = require('../model/users');

const route = express.Router();

route.post('/', async (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.password) 
        return res.status(400).send('Missing Information');

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.message);

    let result = new User({
        name: req.body.name,
        email: req.body.email,
        password: ''
    });

    result.password = await result.generatePassword(req.body.password);
    
    result = await result.save();

    res.send(_.pick(result,['name', 'email']));
});




module.exports = route;