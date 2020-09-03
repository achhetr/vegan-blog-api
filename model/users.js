const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255        
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024         
    }
});

userSchema.method.generatePassword = async function(pass) {
    await bcrypt.hash(pass, saltRounds, function(err, hash) {
        if(err) throw new Error('cannot generate password');
        this.password = hash;
    });

}

const User = mongoose.model('User', userSchema);

function validateUser(args) {
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(5)
                .max(50),
        email: Joi.string()
                .required()
                .email()
                .min(5)
                .max(255),
        password: Joi.string()
                .required()
                .min(5)
                .max(1024),
        
    });
    return schema.validate(args);
}


module.exports.userSchema = userSchema;
module.exports.User = User
module.exports.validateUser = validateUser;
