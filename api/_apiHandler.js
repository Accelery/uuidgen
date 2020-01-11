module.exports = (uuidFn, number) => {
  if (number) {
    // Limit to 10;
    const num = Math.min(+number, 10);
    let uuids = [];
    for (let i = 0; i <= num; i++) {
      uuids.push(uuidFn());
    }
    return { uuids };
  } else {
    const uuid = uuidFn();
    return { uuid };
  }
};
