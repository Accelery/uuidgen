var express = require('express');
const uuidv4 = require('uuid/v4');
const uuidv1 = require('uuid/v1');

var router = express.Router();

const singleUuidFactory = uuidGenMethod => {
  return (req, res) => {
    const uuid = uuidGenMethod();
    const message = 'OK';
    res.status(200).json({ uuid, message });
  };
};

const multiUuidFactory = uuidGenMethod => {
  return (req, res) => {
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
        uuids.push(uuidGenMethod());
      }
      status = 200;
    }
    res.status(status).json({ uuids, message });
  };
};

/* GET multiple V4 UUIDs. */
router.get('/v4/:number', multiUuidFactory(uuidv4));

/** GET one v4 UUID. */
router.get('/v4', singleUuidFactory(uuidv4));

/* GET multiple V1 UUIDs. */
router.get('/v1/:number', multiUuidFactory(uuidv1));

/** GET one v1 UUID. */
router.get('/v1', singleUuidFactory(uuidv1));

module.exports = router;
