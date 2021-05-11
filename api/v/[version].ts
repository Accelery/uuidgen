import { NowRequest, NowResponse } from '@vercel/node';
import { v1, v4 } from 'uuid';

/**
 * Responds to any HTTP request.
 */
export default async (req: NowRequest, res: NowResponse) => {
  const uuidFn = +req.query.version === 1 ? (v1 as Function) : (v4 as Function);
  const num = req.query.q ? Math.min(+req.query.q, 10) : 1;
  const uuids = [];
  for (let i = 0; i < num; i++) {
    uuids.push(uuidFn());
  }
  res.json(uuids);
};
