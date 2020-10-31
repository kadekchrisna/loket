const misc = require("../../infrastructures/configs/response").responses;

module.exports = () => {
  const errorHandler = (err, req, res, next) => {
    const result = MISC.responses({
      status: 500,
      message: err
    })
    return res.status(result.status).send(result.response)
  };
  const notFound = (req, res) => {
    const result = MISC.responses({
      status: 404,
      message: "path not found"
    })
    return res.status(result.status).send(result.response)
  };
  return {
    errorHandler,
    notFound,
  };
};
