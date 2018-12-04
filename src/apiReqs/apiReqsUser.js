const axios = require('axios');

const {
  addNewDocuments,
  updateExistingDocument,
  deleteExistingDocument,
  updateUser,
  refresh,
  oauthUser,
  createNode,
  getAllUserNodes,
  getUserTransactions,
  triggerDummyTransactions
} = require('../constants/apiReqNames');

const { addQueryParams, replacePathParams } = require('../helpers/buildUrls');

module.exports[addNewDocuments] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.patch(`${host}/users/${user_id}`, bodyParams, { headers });
};

module.exports[updateExistingDocument] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.patch(`${host}/users/${user_id}`, bodyParams, { headers });
};

module.exports[deleteExistingDocument] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.patch(`${host}/users/${user_id}`, bodyParams, { headers });
};

module.exports[updateUser] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.patch(`${host}/users/${user_id}`, bodyParams, { headers });
};

module.exports[oauthUser] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.post(`${host}/oauth/${user_id}`, bodyParams, { headers });
};

module.exports[createNode] = ({
  user_id,
  bodyParams,
  userInfo
}) => {
  const { host, headers } = userInfo;

  return axios.post(`${host}/users/${user_id}/nodes`, bodyParams, { headers });
};

module.exports[getAllUserNodes] = ({
  user_id,
  page,
  per_page,
  type,
  userInfo
}) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${user_id}/nodes`,
    page,
    per_page,
    type
  });

  return axios.get(url, { headers });
};

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

// WILL NEED TO MOVE TO NODE CLASS!!!
module.exports[triggerDummyTransactions] = ({ user_id, node_id, is_credit, userInfo }) => {
  const { host, headers } = clientInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}/dummy-tran?is_credit=${is_credit ? 'yes' : 'no'}`;

  return axios.get(url, { headers });
};
