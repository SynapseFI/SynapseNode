import * as userRequests from './apiReqsUser';
import * as clientRequests from './apiReqsClient';

const apiRequests = {
  client: clientRequests,
  user: userRequests,
}

export default apiRequests;