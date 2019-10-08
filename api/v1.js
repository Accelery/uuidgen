const uuidFn = require('uuid/v1');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
module.exports = (req, res) => {
  let num = +req.query.number;
  if (num) {
    let uuids = [];
    statusText = 'OK';
    // Limit to 10;
    if (num > 10) {
      num = 10;
      statusText = 'OK. 10 UUIDs max.';
    }
    for (let i = 0; i <= num; i++) {
      uuids.push(uuidFn());
    }
    status = 200;

    res.status(status).json({ uuids, statusText });
  } else {
    const uuid = uuidFn();
    const statusText = 'OK';
    res.status(200).json({ uuid, statusText });
  }
};
