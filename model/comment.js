const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
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
                unique: true,
                required: true,
                minlength: 5,
                maxlength: 255        
            }
        }),
        required: true
    },
    comment: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 255        
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

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(args) {
    const schema = Joi.object({
        userId: Joi.string()
                .required(),
        comment: Joi.string()
                .required()
                .min(1)
                .max(255)
    });
    return schema.validate(args);
}


module.exports.commentSchema = commentSchema;
module.exports.Comment = Comment
module.exports.validateComment = validateComment;
