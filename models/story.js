const mongoose = require('mongoose')
const epic = require('../models/epic')
const { Schema } = mongoose;

const storySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    epic: {
        type: Schema.Types.ObjectId,
        ref: epic,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: false
    },
    due: {
        type: Date,
        required: false
    },
    started: {
        type: Date,
        required: false
    },
    finished: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['todo', 'running', 'done'],
        required: false,
        default: 'todo'
    }
})

module.exports = mongoose.model('stories', storySchema);