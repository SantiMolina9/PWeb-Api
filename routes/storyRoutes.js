const express = require('express')
const router = express.Router()
const story = require('../controllers/story')
const task = require('../controllers/task')
const {checkToken} = require('../controllers/auth')

router.get("/", story.getStories)
router.get("/:id", checkToken, story.getStoryById)
router.get("/:id/tasks", checkToken, task.getTasksByStory)
router.post("/", checkToken, story.createStory)
router.put("/:id", checkToken, story.editStory)
router.delete("/:id", checkToken, story.deleteStoryById);

module.exports = router;    
