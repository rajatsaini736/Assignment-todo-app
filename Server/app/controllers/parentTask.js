const TASK = require("../models/task");

module.exports = {

  async getAllTasks(req, res) {
    try {
      let tasks = await TASK.find();
      res.json({success: true, data: tasks})
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});
    }
  },

  async postNewParentTask(req, res) {
    try {
      let newTask = { 'task_name': 'new-1', 'overall_status': 'pending' };
      let taskResponse = await TASK.create(newTask);
      
      res.json({success: true, data: taskResponse});
    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});
    }
  },

  async updateParentTask(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  },

  async deleteParentTask(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.json({success: false, data: err});c
    }
  }
}