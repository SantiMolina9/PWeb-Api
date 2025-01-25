const mongoose = require('mongoose');
const project = require('./project');
const { Schema } = mongoose;
const epicSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String, 
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,  
        ref: project,  
        required: true
    }
});

module.exports = mongoose.model('epics', epicSchema);