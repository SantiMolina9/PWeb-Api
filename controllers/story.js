const Story = require('../models/story')
const Epic = require('../models/epic')
const mongoose = require('mongoose')
module.exports.getStories = (req, res) => {
    Story.find().then(
        stories => {
            res.status(200).json({
                message: "Historias encontradas", 
                data: stories
            })
        }
    )
}

module.exports.createStory = (req, res) => {
    const story = new Story({
        name: req.body.name,
        description: req.body.description,
        epic: req.body.epic,
        created: req.body.created,
        due: req.body.due,
        started: req.body.started,
        finished: req.body.finished,
        status: req.body.status
    })
    story.save().then(
        story => {
            res.status(200).json({
                message: "Historia creada correctamente",
                data: story
            })
        }
    )
}
module.exports.getStoriesByEpic = (req, res) => {
    const epicid = req.params.id

    if (!mongoose.Types.ObjectId.isValid(epicid)) {
        return res.status(400).json({
            message: "Error",
            data: { id: "El ID proporcionado no es valido" }
        })
    }

    if (epicid == null || epicid == undefined) {
        res.status(400).json({
        message: "Error",
        data: { id: "Epic Id is requerido" }
        })
    } else {
        Epic.findById(epicid).then(epics => {

        if (epics) {
            Story.find({ epic: epics._id })
            .then(stories => {
                res.status(200).json({
                message: "Historia encontrada",
                epicName: epics.name,
                data: stories
                })
            })
            .catch(err => {
                res.status(500).json({
                message: "Error",
                data: err
            });
            })
        } else {
            res.status(500).json({
            status: "error",
            data: null,
            message: { epic: "Epica no encontrada" }
            })
        }
    })
    }
}

module.exports.getStoryById = (req, res) => {
    const id = req.body.id
    Story.findById(id)
        .then(
            story =>
            res.status(200).json({
                message: "Historia encontrada",
                data: story
            })
        )
}

module.exports.editStory = (req, res) => {
    const id = req.params.id
    Story.findById(id).then(
        story => {
            story.name = req.body.name,
            story.description = req.body.description,
            story.epic = req.body.epic,
            story.created = req.body.created,
            story.due = req.body.due,
            story.started = req.body.started,
            story.finished = req.body.finished,
            story.status = req.body.status

            story.save().then(
                res.status(200).json({
                    message: "Historia editada correctamente",
                    data: story
                })
            )
        }
    )
}

module.exports.deleteStoryById = (req, res) => {
    const id = req.params.id
    Story.findByIdAndDelete(id).then(
        story => res.status(200).json({
            message: "Historia elimanada correctamente",
            data: story 
        })
    )
}