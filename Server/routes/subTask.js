const express = require('express');
const router = express.Router();

const childTaskController = require('../app/controllers/subTask');

// *****   SUB TASKS ROUTES    *****

// Post a new sub task
router.post('/subtask/:parentTaskId', childTaskController.postNewSubTask);

// Update a sub task
router.put('/subtask/:subTaskId', childTaskController.updateSubTask);

// Delete a sub task
router.delete('/subtask/:subTaskId', childTaskController.deleteSubTask);

module.exports = router;
