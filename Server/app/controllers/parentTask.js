const TASK = require("../models/task");
module.exports = {

  async getAllTasks(req, res) {
    try {
      let tasks = await TASK.find({ visibility: true });
      res.json({ success: true, data: tasks })
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});
    }
  },

  async postNewParentTask(req, res) {
    // Request Body Formate
    //
    // reqBody = {
    //   "task_name": "task-1"
    // }
    try {
      let {task_name} = req.body;
      let taskResponse = await TASK.create({ task_name });
      
      res.json({ success: true, data: taskResponse });
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  async updateParentTask(req, res) {
    // Request Parameters
    //
    // taskId = 6196254deb8b080aae19fd20
    
    // Request Body Formate
    //
    // reqBody = {
    //   "task_name": "task-1"
    // }
    // OR
    // reqBody = {
    //   "overall_status": "complete" 
    // }
    try {
      let {taskId} = req.params;
      let reqBody = req.body;
      let updatedTask = await TASK.findOneAndUpdate(taskId, reqBody, { new: true });

      res.json({ success: true, data: updatedTask });
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  async deleteParentTask(req, res) {
    // Request Parameters
    //
    // taskId = 6196254deb8b080aae19fd20
    try {
      let {taskId} = req.params;
      let deletedTask = await TASK.findOneAndUpdate(taskId, { 'visibility': 'false' }, { new: true });

      res.json({ success: true, data: deletedTask });
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  }
}