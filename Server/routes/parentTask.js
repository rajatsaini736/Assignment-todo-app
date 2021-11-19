const express = require('express');
const router = express.Router();
const _parentTaskValidator = require('../app/validators/parentTask');
const parentTaskController = require('../app/controllers/parentTask');

// *****   PARENT TASKS ROUTES    *****

// Get all parent tasks
router.get(
  '/', 
  parentTaskController.getAllTasks
);

// Get a parent task
// router.get('/:taskId', parentTaskController.)

// Post a new parent task
router.post(
  '/create',
  _parentTaskValidator.validateNewTask,
  parentTaskController.postNewParentTask
);

// Update a parent task
router.put(
  '/:taskId', 
  _parentTaskValidator.validateUpdateTask,
  parentTaskController.updateParentTask
);

// Delete a parent task
router.delete(
  '/:taskId', 
  _parentTaskValidator.validateDeleteTask,
  parentTaskController.deleteParentTask
);

module.exports = router;
