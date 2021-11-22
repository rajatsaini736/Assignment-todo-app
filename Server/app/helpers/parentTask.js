const TASK = require("../models/task");

module.exports = {

  async updateParentTaskName(taskId, reqBody) {
    try{
      let result = await TASK.findByIdAndUpdate(taskId, reqBody, { new: true });
      return result;
    } catch (err) {
      throw err;
    }
  },

  async updateParentTaskOverallStatus(taskId, reqBody) {
    try{
      let { overall_status } = reqBody;
      let task = await TASK.findById(taskId);

      if (task && Object.keys(task).length) {
        task["overall_status"] = overall_status;

        if (overall_status == "complete" &&  task.sub_tasks.length) {
          task.sub_tasks.forEach((subTask) => {
            subTask["status"] = overall_status;
          });
        }
        return task.save();
      }
      return;
    } catch (err) {
      throw err;
    }
  }

}