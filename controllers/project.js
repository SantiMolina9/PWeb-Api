const Project = require('../models/project');

module.exports.createProject = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Debe ser un JSON válido",
            data: { body: req.body }
        });
    }

    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        owner: req.body.owner
    });

    project.save()
        .then(project => res.status(200).json({
            message: "Proyecto creado correctamente",
            data: project
        }))
        .catch(err => {
            res.status(500).json({
                message: "Error al crear el proyecto",
                error: err.message
            });
        });
};

module.exports.getProjects = (req, res) => {
    const userID = req.userFromJWT

    Project.find({ owner: userID })
        .then(projects => res.status(200).json({
            message: "Proyectos encontrados",
            data: projects
        }))
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener los proyectos",
                error: err.message
            });
        });
};

module.exports.getProjectById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            message: "ID del proyecto no proporcionado",
            data: { id }
        });
    }

    Project.findById(id)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Proyecto no encontrado",
                    data: { id }
                });
            }
            res.status(200).json({
                message: "Proyecto encontrado",
                data: project
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al obtener el proyecto",
                error: err.message
            });
        });
};

module.exports.editProject = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            message: "ID del proyecto no proporcionado",
            data: { id }
        });
    }

    Project.findById(id)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Proyecto no encontrado",
                    data: { id }
                });
            }

            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.owner = req.body.owner || project.owner;

            project.save()
                .then(projectA => res.status(200).json({
                    message: "Proyecto editado correctamente",
                    data: projectA
                }))
                .catch(err => {
                    res.status(500).json({
                        message: "Error al guardar el proyecto editado",
                        error: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al editar el proyecto",
                error: err.message
            });
        });
};

module.exports.deleteProjectById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            message: "ID del proyecto no proporcionado",
            data: { id }
        });
    }

    Project.findByIdAndDelete(id)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Proyecto no encontrado para eliminar",
                    data: { id }
                });
            }
            res.status(200).json({
                message: "Proyecto eliminado correctamente",
                data: project
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error al eliminar el proyecto",
                error: err.message
            });
        });
};
