export const apiHelper = (uuidFn, req) => {
  if (req.query.number) {
    // Limit to 10;
    const num = Math.min(+req.query.number, 10);
    const uuids = [];
    for (let i = 0; i <= num; i++) {
      uuids.push(uuidFn());
    }
    return { uuids };
  } else {
    const uuid = uuidFn();
    return { uuid };
  }
};
