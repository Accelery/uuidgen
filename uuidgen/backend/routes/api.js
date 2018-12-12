var express = require('express');
const uuidv4 = require('uuid/v4');

var router = express.Router();

/* GET home page. */
router.get('/v4/:number', function(req, res, next) {
  const num = +req.params.number;
  let uuids = [];

  for (let i = 0; i <= num; i++) {
    uuids.push(uuidv4());
  }
  res.status(200).json({ uuids });
});

router.get('/v4', function(req, res, next) {
  const uuid = uuidv4();
  res.status(200).json({ uuid });
});

module.exports = router;
