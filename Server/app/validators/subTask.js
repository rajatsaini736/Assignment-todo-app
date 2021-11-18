const _err = require('./error');
const OVERALL_STATUS_ENUM = ['pending', 'complete'];

module.exports = {

  validateNewSubtask(req, res, next) {
    try{
      if (!req.params.parentTaskId) throw _err.createError('Bad Request', 'Request Parameters Not Found');
      if (!req.body.subTask_name) throw _err.createError('Bad Request Body', 'Request Body Not Found');

      next();
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  },

  validateUpdateSubTask(req, res, next) {
    try{  
      if (!req.params.parentTaskId) throw _err.createError('Bad Request', 'Request Parameters Not Found');
      if (!req.body.subTaskId || (!req.body.subTask_name && (!req.body.status || !OVERALL_STATUS_ENUM.includes(req.body.status)))) throw _err.createError('Bad Request Body', 'Request Body Not Found');

      next();
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }    
  },

  validateDeleteSubTask(req, res, next) {
    try{
      if (!req.params.parentTaskId || !req.params.subTaskId) throw _err.createError('Bad Request', 'Request Parameters Not Found');

      next();
    } catch (err) {
      console.log(err);
      res.json({ success: false, data: err });
    }
  }

}