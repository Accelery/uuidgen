module.exports = (uuidFn, req, res) => {
  if (req.query.number) {
    // Limit to 10;
    const num = Math.min(+req.query.number, 10);
    let uuids = [];
    for (let i = 0; i <= num; i++) {
      uuids.push(uuidFn());
    }
    res.json({ uuids });
  } else {
    const uuid = uuidFn();
    res.json({ uuid });
  }
};
