const constants = require("../contants");

const errorHandler = (error, req, res, next) => {
  const statuscode = res.statusCode || 500;
  console.log(`error - ${req.method} - ${req.url} - ${statuscode}`);
  switch (statuscode) {
    case constants.NOT_FOUND:
      res.status(statuscode).json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.BAD_REQUEST:
        res.status(400).json({
            title: "Bad Request! - Validation Error!",
            message: error.message,
            stackTrace: error.stack,
        })
      break;
    case constants.FORBIDDEN:
        res.status(403).json({
            title: "Forbidden!",
            message: error.message,
            stackTrace: error.stack,
        })
      break;
    case constants.UNAUTHORIZED:
        res.status(401).json({
            title: "Un-Authorized!",
            message: error.message,
            stackTrace: error.stack,
        })
      break;
    case constants.SERVER_ERROR:
        res.status(500).json({
            title: "Server Error!",
            message: error.message,
            stackTrace: error.stack,
        })
      break;

    default:
        console.log('No error - All is good!');
      break;
  }
};

module.exports = errorHandler;
