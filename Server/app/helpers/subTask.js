const TASK = require('../models/task');
const _err = require('../validators/error')

module.exports = {

  async updateSubTaskName(parentTaskId, subTaskId, subTaskName) {
    try{
      let task = await TASK.findById(parentTaskId);

      if (!task.sub_tasks.length) throw _err.createError('Database Error', 'No sub task are present for this task');

      let subTask = task.sub_tasks.find((subTask) => subTask.visibility && subTask._id == subTaskId);

      if (!subTask || !Object.keys(subTask).length) throw _err.createError('Database Error', 'No sub task found with this id');

      subTask["task_name"] = subTaskName || subTask["task_name"];

      return await task.save();
    } catch (err) {
      throw err;
    }
  },

  async updateSubTaskStatus(parentTaskId, subTaskId, status) {
    try{
      let task = await TASK.findById(parentTaskId);

      if (!task.sub_tasks.length) throw _err.createError('Database Error', 'No sub task are present for this task');

      let subTask = task.sub_tasks.find((subTask) => subTask.visibility && subTask._id == subTaskId);

      if (!subTask || !Object.keys(subTask).length) throw _err.createError('Database Error', 'No sub task found with this id');

      subTask["status"] = status || subTask["status"];

      if (status == "complete" && task.sub_tasks.filter((subTask) => subTask.visibility).every((subTask) => subTask.status == 'complete')) {
        task["overall_status"] = "complete";
        return await task.save();
      }
      return await task.save();
    } catch (err) {
      throw err;
    }
  }

}