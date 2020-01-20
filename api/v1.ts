import { NowRequest, NowResponse } from '@now/node';
import { v1 } from 'uuid';

const apiHandler = require('./_apiHandler');

/**
 * Responds to any HTTP request.
 */
module.exports = (req: NowRequest, res: NowResponse) => {
  apiHandler(v1, req, res);
};
