const express = require('express');
const router = express.Router();

const subTaskController = require('../app/controllers/subTask');

// *****   SUB TASKS ROUTES    *****

// Post a new sub task
router.post('/subtask/:parentTaskId', subTaskController.postNewSubTask);

// Update a sub task
router.put('/subtask/:subTaskId', subTaskController.updateSubTask);

// Delete a sub task
router.delete('/subtask/:subTaskId', subTaskController.deleteSubTask);

module.exports = router;
