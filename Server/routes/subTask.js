const express = require('express');
const router = express.Router();

const subTaskController = require('../app/controllers/subTask');
const _subTaskValidator = require('../app/validators/subTask');
// *****   SUB TASKS ROUTES    *****

// Post a new sub task
router.post(
  '/:parentTaskId', 
  _subTaskValidator.validateNewSubtask,
  subTaskController.postNewSubTask
);

// Update a sub task
router.put(
  '/:parentTaskId', 
  _subTaskValidator.validateUpdateSubTask,
  subTaskController.updateSubTask
);

// Delete a sub task
router.delete(
  '/:parentTaskId/:subTaskId', 
  _subTaskValidator.validateDeleteSubTask,
  subTaskController.deleteSubTask
);

module.exports = router;
