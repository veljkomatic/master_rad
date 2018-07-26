const mongoose = require('mongoose');

const { Schema } = mongoose;

const emailSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})

const issueSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: emailSchema,
        required: true
    },
    services: {
        type: Object,
        optional: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', issueSchema);

module.exports = User;
