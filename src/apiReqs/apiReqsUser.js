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
  getNode,
  getUserTransactions,
  triggerDummyTransactions,
  generateUboForm,
  getStatementsByUser,
  getStatementsByNode,
  shipDebitCard,
  resetDebitCard,
  verifyMicroDeposits
  // STARTING FROM REINITIATE MICRO-DEPOSITS
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

module.exports[getNode] = ({ node_id, full_dehydrate, force_refresh, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}`,
    full_dehydrate,
    force_refresh
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

module.exports[triggerDummyTransactions] = ({ user_id, node_id, is_credit, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}/dummy-tran?is_credit=${is_credit ? 'yes' : 'no'}`;

  return axios.get(url, { headers });
};

module.exports[generateUboForm] = ({ user_id, bodyParams, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/ubo`;

  return axios.patch(url, payload, { headers });
};

module.exports[getStatementsByUser] = ({ user_id, page, per_page, userInfo }) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${user_id}/statements`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getStatementsByNode] = ({ user_id, node_id, page, per_page, userInfo }) => {
  const { host, headers } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${user_id}/nodes/${node_id}/statements`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[shipDebitCard] = ({ user_id, node_id, bodyParams, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}?ship=yes`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[resetDebitCard] = ({ user_id, node_id, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}?reset=yes`;

  return axios.patch(url, {}, { headers });
};

module.exports[verifyMicroDeposits] = ({ user_id, node_id, bodyParams, userInfo }) => {
  const { host, headers } = userInfo;
  const url = `${host}/users/${user_id}/nodes/${node_id}`;

  return axios.patch(url, bodyParams, { headers });
};

// !!!!!!!! WILL NEED TO REFACTOR/REMOVE USER_ID FROM METHODS ABOVE !!!!!!!!
module.exports[reinitiateMicroDeposits] = ({ node_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}?resend_micro=yes`;

  return axios.patch(url, {}, { headers });
};

module.exports[updateNode] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[deleteNode] = ({ node_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}`;

  return axios.delete(url, { headers });
};

module.exports[createTransaction] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans`;

  return axios.post(url, bodyParams, { headers });
};

module.exports[getTransaction] = ({ node_id, trans_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

  return axios.get(url, { headers });
};

module.exports[getAllNodeTransactions] = ({ node_id, trans_id, page, per_page, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}/trans`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[deleteTransaction] = ({ node_id, trans_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

  return axios.delete(url, { headers });
};
