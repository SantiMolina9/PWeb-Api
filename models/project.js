const mongoose = require('mongoose')
const user = require('./user')

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }
})

module.exports = mongoose.model('projects', projectSchema)