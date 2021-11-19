const TASK = require("../models/task");
module.exports = {

  async getAllTasks(req, res) {
    try {
      let taskQuery = [
        {
          $match: { 'visibility': true }
        },
        {
          $unwind: {
              path: '$sub_tasks',
              preserveNullAndEmptyArrays: true
          }
        },
        {
          $match: {
              $or: [
                { 'sub_tasks': { $exists: false } }, 
                { 'sub_tasks.visibility': true }
              ]
          }
        },
        {
          $group: {
              _id: '$_id',
              task_name: { $first: '$task_name' },
              overall_status: { $first: '$overall_status' },
              visibility: { $first: '$visibility' },
              sub_tasks: { $push: '$sub_tasks' }
          }
        }
      ];
      let tasks = await TASK.aggregate(taskQuery);
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
      let { task_name } = req.body;
      let taskResponse = await TASK.create({ task_name });
      
      res.json({ success: true, data: taskResponse });
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  async updateParentTask(req, res) {
    // *** Request Parameters ***
    //
    // taskId = 6196254deb8b080aae19fd20
    
    // *** Request Body Formate ***
    //
    // reqBody = {
    //   "task_name": "task-1"
    // }
    // OR
    // reqBody = {
    //   "overall_status": "complete" 
    // }
    try {
      let { taskId } = req.params;
      let reqBody = req.body;
      let updatedTask = await TASK.findByIdAndUpdate(taskId, reqBody, { new: true });

      res.json({ success: true, data: updatedTask });
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  async deleteParentTask(req, res) {
    // *** Request Parameters ***
    //
    // taskId = 6196254deb8b080aae19fd20
    try {
      let { taskId } = req.params;
      let deletedTask = await TASK.findByIdAndUpdate(taskId, { 'visibility': 'false' }, { new: true });

      res.json({ success: true, data: deletedTask });
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  }
}