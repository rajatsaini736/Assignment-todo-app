const _err = require('./error');
const OVERALL_STATUS_ENUM = ['pending', 'complete'];

module.exports = {
  
  validateNewTask(req, res, next) {
    try{
      if (!req.body.task_name) throw _err.createError('Bad Request Body', 'Request Body Not Found'); 

      next();
    } catch(err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  validateUpdateTask(req, res, next) {
    try{
      if (!req.body.task_name && (!req.body.overall_status || !OVERALL_STATUS_ENUM.includes(req.body.overall_status))) throw _err.createError('Bad Request Body', 'Request Body Not Found'); 
      if (!req.params.taskId) throw _err.createError('Bad Request', 'Request Parameters Not Found');
      
      next();
    } catch(err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  validateDeleteTask(req, res, next) {
    try{
      if (!req.params.taskId) throw _err.createError('Bad Request', 'Request Parameters Not Found');

      next();
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  }

}