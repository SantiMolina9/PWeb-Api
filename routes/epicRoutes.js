const express = require('express')
const router = express.Router();
const epic = require('../controllers/epic')
const story = require('../controllers/story')
const { checkToken } = require('../controllers/auth')

router.get("/", checkToken, epic.getEpics)
router.get("/:id/stories", checkToken, story.getStoriesByEpic)
router.get("/:id", checkToken, epic.getEpicById)
router.post("/", checkToken, epic.createEpic)
router.put("/:id", checkToken, epic.editEpic)
router.delete("/:id", checkToken, epic.deleteEpicById)  

module.exports = router