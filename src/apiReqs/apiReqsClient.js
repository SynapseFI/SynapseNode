const axios = require('axios');

const {
  createUser,
  getAllUsers,
  getUser,
  getUserDuplicates,
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
  getTradeMarketData,
  verifyAddress,
  verifyRoutingNumber
} = require('../constants/apiReqNames');

const { addQueryParams, replacePathParams } = require('../helpers/buildUrls');

module.exports[createUser] = ({
  bodyParams,
  headers,
  clientInfo
}) => {
  const { host } = clientInfo;

  // WILL NEED TO IMPLEMENT STATIC ENDPOINTS
  // Consider using Infinity, see also: https://github.com/axios/axios/issues/1362#issuecomment-523624913
  const config = {
    "headers": headers,
    "maxContentLength": 30 * 1048576,  // 30MiB is configured by the server.
    "maxBodyLength": 30 * 1048576
  };
  return axios.post(`${host}/users`, bodyParams, config);
};

module.exports[getAllUsers] = ({
  query,
  page,
  per_page,
  show_refresh_tokens,
  clientInfo
}) => {
  const { host, headers } = clientInfo;

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

module.exports[getUser] = ({ user_id, full_dehydrate, headers, clientInfo }) => {
  const { host } = clientInfo;
  // REFACTOR TO USE ADD_QUERY_PARAMS
  const url = `${host}/users/${user_id}?full_dehydrate=${full_dehydrate ? 'yes' : 'no'}`;

  // REFACTOR TO USE REPLACE_PATH_PARAMS
  return axios.get(url, { headers });
};

module.exports[getUserDuplicates] = ({ user_id, headers, clientInfo }) => {
  const { host } = clientInfo;
  // REFACTOR TO USE ADD_QUERY_PARAMS
  const url = `${host}/users/${user_id}/get-duplicates`;

  // REFACTOR TO USE REPLACE_PATH_PARAMS
  return axios.get(url, { headers });
};

module.exports[getPlatformTransactions] = ({ page, per_page, filter, clientInfo }) => {
  const { host, headers } = clientInfo;

  return axios.get(
    addQueryParams({
      // STATIC ENDPOINT
      originalUrl: `${host}/trans`,
      page,
      per_page,
      filter
    }),
    { headers }
  );
};

module.exports[getPlatformNodes] = ({ page, per_page, filter, clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/nodes`,
    page,
    per_page,
    filter
  });

  return axios.get(url, { headers });
};

module.exports[getInstitutions] = ({ clientInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/institutions`

  return axios.get(url, { headers });
};

module.exports[issuePublicKey] = ({ scope, clientInfo, userId }) => {
  const { host, headers } = clientInfo;
  let url = `${host}/client?issue_public_key=yes&scope=${scope.join()}`;
  if(userId) {
    url += `&user_id=${userId}`
  }

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

module.exports[updateSubscription] = ({ subscription_id, bodyParams, clientInfo}) => {
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

module.exports[verifyAddress] = ({ address_city, address_country_code, address_postal_code, address_street, address_subdivision, clientInfo }) => {
  const { host, headers } = clientInfo;
  const reqBody = { address_city, address_country_code, address_postal_code, address_street, address_subdivision };
  const baseUrl = `${host}/address-verification`;

  return axios.post(baseUrl, reqBody, { headers });
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

module.exports[verifyRoutingNumber] = ({ routing_num, type, clientInfo}) => {
  const { host, headers } = clientInfo;
  const reqBody = { routing_num, type };
  const baseUrl = `${host}/routing-number-verification`;
  return axios.post(baseUrl, reqBody, { headers });
};
