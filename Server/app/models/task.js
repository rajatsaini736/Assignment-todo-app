const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
  'task_name': {
    type: String,
    required: true,
  },
  'status': {
    type: String,
    enum: ['pending', 'complete'],
  },
  'visibility': {
    type: Boolean,
    default: true,
  }
})

const taskSchema = new Schema(
  {
    'task_name': {
      type: String,
      required: true,
    },
    'overall_status': {
      type: String,
      enum: ['pending', 'complete'],
      default: 'pending'
    },
    sub_tasks: [subTaskSchema],
    'visibility': {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    versionKey: false
  }
);

module.exports = mongoose.model('tasks', taskSchema);