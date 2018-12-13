var express = require('express');
const uuidv4 = require('uuid/v4');

var router = express.Router();

/* GET multiple V4 UUIDs. */
router.get('/v4/:number', function(req, res, next) {
  let uuids = [];
  let message = 'invalid request.';
  let status = 400;

  // Parse param to number.
  let num = +req.params.number;
  if (num) {
    message = 'OK';
    // Limit to 10;
    if (num > 10) {
      num = 10;
      message = 'OK. 10 UUIDs max.';
    }
    for (let i = 0; i <= num; i++) {
      uuids.push(uuidv4());
    }
    status = 200;
  }
  res.status(status).json({ uuids, message });
});

/** GET one v4 UUID. */
router.get('/v4', function(req, res, next) {
  const uuid = uuidv4();
  const message = 'OK';
  res.status(200).json({ uuid, message });
});

module.exports = router;
