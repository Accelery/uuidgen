export const apiHelper = (uuidFn, req) => {
  const num = req.query.q ? Math.min(+req.query.q, 10) : 1;
  const uuids = [];
  for (let i = 0; i < num; i++) {
    uuids.push(uuidFn());
  }
  return uuids;
};
