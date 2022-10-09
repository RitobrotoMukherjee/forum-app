const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title of the entry is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    type: {
        type: Number,
        required: [true, 'Type is required'],
        validate: {
            validator: v => /^[\d+]*$/g.test(v),
            message: props => `Type value: ${props.value} is not a valid integer`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Forum', ForumSchema);
