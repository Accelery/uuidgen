import { NowRequest, NowResponse } from '@now/node';
import { v4 } from 'uuid';
import { apiHelper } from './_apiHandler';

/**
 * Responds to any HTTP request.
 */
export default (request: NowRequest, response: NowResponse) => {
  response.json(apiHelper(v4, request));
};
