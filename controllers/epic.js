const Epic = require('../models/epic');
const Project = require('../models/project');
const mongoose = require('mongoose'); 

module.exports.getEpics = (req, res) => {
    Epic.find().then(epics => {
        res.status(200).json({
            message: "Epicas encontradas",
            data: epics
        })
    })
}

module.exports.createEpic = (req, res) => {
    const epic = new Epic({
        name: req.body.name, 
        description: req.body.description,
        project: req.body.project
    })
    epic.save().then(
        epic => res.status(200).json({
            message: "Epica creada correctamente",
            data: epic
        })
    )
}


module.exports.getEpicsByProject = (req, res) => {
    const projectid = req.params.id
    
    if (!mongoose.Types.ObjectId.isValid(projectid)) {
        return res.status(400).json({
            message: "Error",
            data: { id: "El ID proporcionado no es valido" }
        })
    }

    if (projectid == null || projectid == undefined) {
        res.status(400).json({  
        message: "Error",
        data: { id: "El id no se proporciono" }
    })
    } else {
        Project.findById(projectid).then(project => {
        if (project) {
            Epic.find({project: project._id})
            .then(epics => {
                res.status(200).json({
                status: "success",
                projectName: project.name,
                data: epics
                })  
            })
            .catch(err => {
                res.status(500).json({
                status: "error",
                message: err
                });
            })
        } else {
            res.status(500).json({
            status: "error",
            data: null,
            message: { project: "Project not found" }
            })
        }
        })
    }
}
module.exports.getEpicById = (req, res) => {
    const id = req.params.id
    Epic.findById(id)
        .then(epic => {
            res.status(200).json({
                message: "Epica encontrada", 
                data: epic
            })
        })
        .catch(err => {
            res.status(500).json({
            status: "error",
            message: err
            });
        })
}

module.exports.editEpic = (req, res) => {
    const id = req.params.id
    Epic.findById(id)
        .then(epic => {
            epic.name = req.body.name,
            epic.description = req.body.description
            epic.save().then(epic => 
                res.status(200).json({
                    message: "Epica editada correctamente",
                    data: epic
                })
            )
        })
}

module.exports.deleteEpicById = (req, res) => {
    const id = req.params.id
    Epic.findByIdAndDelete(id).then(
        epic => {
            res.status(200).json({
                message: "Epica eliminada correctamente",
                data: epic
            })
        }
    )
}