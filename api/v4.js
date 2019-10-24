const uuidFn = require('uuid/v4');

const apiHandler = require('./_apiHandler');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
module.exports = (req, res) => {
  apiHandler(uuidFn, req, res);
};
