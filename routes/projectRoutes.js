const project = require('../controllers/project')
const epic = require('../controllers/epic.js')
const express = require('express')
const router = express.Router()
const { checkToken } = require("../controllers/auth.js");

router.get("/", checkToken,  project.getProjects)
router.post("/", checkToken, project.createProject)
router.get("/:id/epics", checkToken,  epic.getEpicsByProject);
router.get("/:id", checkToken, project.getProjectById)
router.put("/:id", checkToken, project.editProject)
router.delete("/:id", checkToken, project.deleteProjectById)

module.exports = router;