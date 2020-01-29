import { NowRequest, NowResponse } from '@now/node';
import { v1, v4 } from 'uuid';

/**
 * Responds to any HTTP request.
 */
export default async (req: NowRequest) => {
  let uuidFn;
  switch (+req.query.version) {
    case 1:
      uuidFn = v1;
      break;
    case 4:
      uuidFn = v4;
      break;
  }
  const num = req.query.q ? Math.min(+req.query.q, 10) : 1;
  const uuids = [];
  for (let i = 0; i < num; i++) {
    uuids.push(uuidFn());
  }
  return uuids;
};
