import { NowRequest, NowResponse } from '@now/node';
import { v1 } from 'uuid';
import { apiHelper } from './_apiHandler';

/**
 * Responds to any HTTP request.
 */
export default (request: NowRequest, response: NowResponse) => {
  response.json(apiHelper(v1, request));
};
