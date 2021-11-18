const TASK = require("../models/task");
 
module.exports = {

  async postNewSubTask(req, res) {
    // Request Parameters
    //
    // parentTaskId = 6196254deb8b080aae19fd20

    // Request Body Formate
    //
    // reqBody = {
    //   "subTask_name": "task-1"
    // }
    try {
      let { parentTaskId } = req.params;
      let { subTask_name: task_name } = req.body;
      let task = await TASK.findByIdAndUpdate( parentTaskId, {
        $push: {
          sub_tasks: {
            task_name
          }
        }
      }, { new: true });

      res.json({ success: true, data: task });
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  }, 

  async updateSubTask(req, res) {
    // Request Parameters
    //
    // parentTaskId = 6196254deb8b080aae19fd20

    // Request Body Formate
    //
    // reqBody = {
    //   "subTaskId": 6196254deb8b080aae19fd20
    //   "subTask_name": "task-1"
    // }
    // OR
    // reqBody = {
    //   "subTaskId": 6196254deb8b080aae19fd20
    //   "status": "complete"
    // } 
    try {
      let { parentTaskId } = req.params;
      let { subTaskId, subTask_name, status } = req.body;

      let task = await TASK.findOne({ parentTaskId });
      let updatedTask;
      if (task.sub_tasks.length) {
        let subTask = task.sub_tasks.find((subTask) => subTask._id == subTaskId);

        if (subTask && subTask.visibility) {
          subTask["task_name"] = subTask_name || subTask["task_name"];
          subTask["status"] = status || subTask["status"];

          updatedTask = await task.save();
        }
      }

      res.json({ success: true, data: updatedTask });
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});
    }
  },

  async deleteSubTask(req, res) {
    // Request Parameters
    //
    // parentTaskId = 6196254deb8b080aae19fd20
    // subTaskId = 619635d11d762902d019e8f4
    try {
      let { parentTaskId, subTaskId } = req.params;

      let task = await TASK.findOne({ parentTaskId });
      let updatedTask;
      
      if (task.sub_tasks.length) {
        let subTask = task.sub_tasks.find((subTask) => subTask._id == subTaskId);

        if (subTask) subTask["visibility"] = false;

        updatedTask = await task.save();
      }

      res.json({ success: true, data: updatedTask });
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  }

}