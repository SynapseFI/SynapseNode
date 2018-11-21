const axios = require('axios');

const {
  createUser,
  getAllUsers,
  getUser,
  getPlatformTransactions,
  getUserTransactions,
  getPlatformNodes,
  getInstitutions,
  triggerDummyTransactions,
  issuePublicKey,
  createSubscription,
  getAllSubscriptions,
  getSubscription,
  updateSubscription
} = require('../constants/apiReqNames');

const { addQueryParams, replacePathParams } = require('../helpers/buildUrls');

module.exports[createUser] = ({
  logins,
  phone_numbers,
  legal_names,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;
  const reqBody = bodyParams || { logins, phone_numbers, legal_names };

  // WILL NEED TO IMPLEMENT STATIC ENDPOINTS
  return axios.post(`${host}/users`, reqBody, { headers });
};

module.exports[getAllUsers] = ({
  query,
  page,
  per_page,
  show_refresh_tokens,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.get(
    addQueryParams({
      // STATIC ENDPOINT
      originalUrl: `${host}/users`,
      query,
      page,
      per_page,
      show_refresh_tokens
    }),
    { headers }
  );
};

module.exports[getUser] = ({ full_dehydrate, userInfo }) => {
  const { host, headers } = userInfo;
  // REFACTOR TO USE ADD_QUERY_PARAMS
  const url = `${host}/${user_id}?full_dehydrate=${full_dehydrate}`;

  // REFACTOR TO USE REPLACE_PATH_PARAMS
  return axios.get(url, { headers });
};

module.exports[getPlatformTransactions] = ({ page, per_page, userInfo }) => {
  const { host, headers } = userInfo;

  return axios.get(
    addQueryParams({
      // STATIC ENDPOINT
      originalUrl: `${host}/trans`,
      page,
      per_page
    }),
    { headers }
  );
};

// MOVE TO API_REQ_USER!!!
module.exports[getUserTransactions] = ({ user_id, page, per_page, userInfo }) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/users/${user_id}/trans`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getPlatformNodes] = ({ page, per_page, userInfo }) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/nodes`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getInstitutions] = ({ userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/institutions`

  return axios.get(url, { headers });
};

// MOVE TO API_REQ_USER!!!
module.exports[triggerDummyTransactions] = ({ user_id, node_id, is_credit, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}/dummy-tran?is_credit=${is_credit}`;

  return axios.get(url, { headers });
};

module.exports[issuePublicKey] = ({ scope, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/client?issue_public_key=yes&scope=${scope}`;

  return axios.get(url, { headers });
};

module.exports[createSubscription] = ({ url, scope, userInfo }) => {
  const { host, headers } = userInfo;
  const reqBody = { url, scope };
  const baseUrl = `${host}/subscriptions`;

  return axios.post(baseUrl, reqBody, { headers });
};

module.exports[getAllSubscriptions] = ({ page, per_page, userInfo }) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT?
    originalUrl: `${host}/subscriptions`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getSubscription] = ({ subscription_id, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/subscriptions/${subscription_id}`;

  return axios.get(url, { headers });
};

module.exports[updateSubscription] = ({ subscription_id, bodyParams, userInfo}) => {
  const { host, headers } = userInfo;
  const url = `${host}/subscriptions/${subscription_id}`;
  // CHECK IF VALID BODY PARAMS???
  const reqBody = bodyParams;

  return axios.patch(url, reqBody, { headers });
};
