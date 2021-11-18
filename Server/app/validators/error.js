exports.createError = (errName, errMsg) => {
  let error = new Error;
  error.message = errMsg;
  return error;
}