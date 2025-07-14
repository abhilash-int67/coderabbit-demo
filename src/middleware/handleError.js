
const handleError = (err, req, res, next) => {
  let message;
  let statusCode;
  console.log(err);
  if (err.statusCode) {
    message = err.message || 'serverError';
    statusCode = err.statusCode;
  } else {
    // logger.error(JSON.stringify({ message: err.message, stack: err.stack }));
   
    message = 'serverError';
    statusCode = 500;
  }

  res.status(statusCode).send({ status:"Failed", message: message });
}

module.exports = handleError;