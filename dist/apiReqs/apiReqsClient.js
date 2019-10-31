const axios = require('axios');

const {
  createUser,
  getAllUsers,
  getUser,
  getPlatformTransactions,
  getPlatformNodes,
  getInstitutions,
  issuePublicKey,
  createSubscription,
  getAllSubscriptions,
  getSubscription,
  updateSubscription,
  locateAtms,
  getCryptoQuotes,
  getCryptoMarketData,
  getWebhookLogs,
  getTradeMarketData
} = require('../constants/apiReqNames');

const { addQueryParams, replacePathParams } = require('../helpers/buildUrls');

module.exports[createUser] = ({
  bodyParams,
  headers,
  clientInfo
}) => {
  const { host } = clientInfo;

  // WILL NEED TO IMPLEMENT STATIC ENDPOINTS
  return axios.post(`${host}/users`, bodyParams, { headers });
};

module.exports[getAllUsers] = ({
  query,
  page,
  per_page,
  show_refresh_tokens,
  clientInfo
}) => {
  const { host, headers } = clientInfo;

  return axios.get(addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/users`,
    query,
    page,
    per_page,
    show_refresh_tokens
  }), { headers });
};

module.exports[getUser] = ({ user_id, full_dehydrate, headers, clientInfo }) => {
  const { host } = clientInfo;
  // REFACTOR TO USE ADD_QUERY_PARAMS
  const url = `${host}/users/${user_id}?full_dehydrate=${full_dehydrate ? 'yes' : 'no'}`;

  // REFACTOR TO USE REPLACE_PATH_PARAMS
  return axios.get(url, { headers });
};

module.exports[getPlatformTransactions] = ({ page, per_page, clientInfo }) => {
  const { host, headers } = clientInfo;

  return axios.get(addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/trans`,
    page,
    per_page
  }), { headers });
};

module.exports[getPlatformNodes] = ({ page, per_page, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/nodes`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getInstitutions] = ({ clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/institutions`;

  return axios.get(url, { headers });
};

module.exports[issuePublicKey] = ({ scope, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/client?issue_public_key=yes&scope=${scope.join()}`;

  return axios.get(url, { headers });
};

module.exports[createSubscription] = ({ url, scope, clientInfo }) => {
  const { host, headers } = clientInfo;
  const reqBody = { url, scope };
  const baseUrl = `${host}/subscriptions`;

  return axios.post(baseUrl, reqBody, { headers });
};

module.exports[getAllSubscriptions] = ({ page, per_page, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT?
    originalUrl: `${host}/subscriptions`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getSubscription] = ({ subscription_id, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/subscriptions/${subscription_id}`;

  return axios.get(url, { headers });
};

module.exports[updateSubscription] = ({ subscription_id, bodyParams, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/subscriptions/${subscription_id}`;
  // CHECK IF VALID BODY PARAMS???
  const reqBody = bodyParams;

  return axios.patch(url, reqBody, { headers });
};

module.exports[locateAtms] = ({ page, per_page, zip, radius, lat, lon, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    originalUrl: `${host}/nodes/atms`,
    page,
    per_page,
    zip,
    radius,
    lat,
    lon
  });

  return axios.get(url, { headers });
};

module.exports[getCryptoQuotes] = ({ clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/nodes/crypto-quotes`;

  return axios.get(url, { headers });
};

module.exports[getCryptoMarketData] = ({ limit, currency, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    originalUrl: `${host}/nodes/crypto-market-watch`,
    limit,
    currency
  });

  return axios.get(url, { headers });
};

module.exports[getWebhookLogs] = ({ clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/subscriptions/logs`;

  return axios.get(url, { headers });
};

module.exports[getTradeMarketData] = ({ ticker, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    originalUrl: `${host}/nodes/trade-market-watch`,
    ticker
  });

  return axios.get(url, { headers });
};