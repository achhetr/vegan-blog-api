const mongoose = require('mongoose');
const Joi = require('joi');

const blogSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255        
            }
        }),
        required: true
    },
    title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    body: {
        type: String,
        minlength: 255,
        maxlength: 10000,
        required: true         
    },
    dateOfCreation: {
        type: Date,
        default: Date.now()
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    }
});

const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(args) {
    const schema = Joi.object({
        userId: Joi.string()
                .required(),
        body: Joi.string()
                .required()
                .min(255)
                .max(10000),
        title: Joi.string()
                .required()
                .min(5)
                .max(255)
    });
    return schema.validate(args);
}


module.exports.blogSchema = blogSchema;
module.exports.Blog = Blog
module.exports.validateBlog = validateBlog;
