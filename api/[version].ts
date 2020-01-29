import { NowRequest, NowResponse } from '@now/node';

/**
 * Responds to any HTTP request.
 */
export default async (req: NowRequest, response: NowResponse) => {
  const uuidFn = await import('uuid/' + req.query.version);
  const num = req.query.q ? Math.min(+req.query.q, 10) : 1;
  const uuids = [];
  for (let i = 0; i < num; i++) {
    uuids.push(uuidFn());
  }
  return uuids;
};
