import { NowRequest, NowResponse } from '@now/node';
import { v1, v4 } from 'uuid';

/**
 * Responds to any HTTP request.
 */
export default async (req: NowRequest, res: NowResponse) => {
  let uuidFn;
  console.log(+req.query.version);
  switch (+req.query.version) {
    case 1:
      uuidFn = v1;
      break;
    case 4:
      uuidFn = v4;
      break;
    default:
      uuidFn = v4;
  }
  const num = req.query.q ? Math.min(+req.query.q, 10) : 1;
  const uuids = [];
  for (let i = 0; i < num; i++) {
    uuids.push(uuidFn());
  }
  res.json(uuids);
};
