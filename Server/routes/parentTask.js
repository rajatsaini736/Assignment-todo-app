const express = require('express');
const router = express.Router();

const parentTaskController = require('../app/controllers/parentTask');

// *****   PARENT TASKS ROUTES    *****

// Get all parent tasks
router.get('/', parentTaskController.getAllTasks);

// Get a parent task
// router.get('/:taskId', parentTaskController.)

// Post a new parent task
router.post('/create', parentTaskController.postNewParentTask);

// Update a parent task
router.put('/:taskId', parentTaskController.updateParentTask);

// Delete a parent task
router.delete('/:taskId', parentTaskController.deleteParentTask);

module.exports = router;
