const axios = require('axios');

const {
  addUserKyc,
  deleteExistingDocument,
  updateUser,
  getUserDuplicates,
  swapDuplicateUsers,
  _grabRefreshToken,
  _oauthUser,
  createNode,
  verifyAchMfa,
  getAllUserNodes,
  getNode,
  getUserTransactions,
  triggerDummyTransactions,
  generateUboForm,
  getStatementsByUser,
  getStatementsByNode,
  shipCardNode,
  resetCardNode,
  verifyMicroDeposits,
  reinitiateMicroDeposits,
  updateNode,
  deleteNode,
  generateApplePayToken,
  generateECashBarcode,
  createTransaction,
  getTransaction,
  getAllNodeTransactions,
  deleteTransaction,
  commentOnStatus,
  disputeCardTransaction,
  getAllSubnets,
  getSubnet,
  createSubnet,
  updateSubnet,
  shipCard,
  registerNewFingerprint,
  supplyDevice2FA,
  verifyFingerprint2FA,
  createBatchTransactions,
  getAllCardShipments,
  getCardShipment,
  deleteCardShipment,
} = require('../constants/apiReqNames');

const { addQueryParams, replacePathParams } = require('../helpers/buildUrls');

module.exports[addUserKyc] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.patch(`${host}/users/${id}`, bodyParams, { headers });
};

module.exports[deleteExistingDocument] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.patch(`${host}/users/${id}`, bodyParams, { headers });
};

module.exports[updateUser] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const config = {
    "headers": headers,
    "maxContentLength": 30 * 1048576,  // 30MiB is configured by the server.
    "maxBodyLength": 30 * 1048576
  };
  return axios.patch(`${host}/users/${id}`, bodyParams, config);
};

module.exports[getUserDuplicates] = ({ userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/get-duplicates`,
    full_dehydrate,
    force_refresh
  });
  
  return axios.get(url, { headers });
};

module.exports[swapDuplicateUsers] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const config = {
    "headers": headers
  };
  return axios.patch(`${host}/users/${id}/swap-duplicate-users`, bodyParams, config);
};

module.exports[_oauthUser] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.post(`${host}/oauth/${id}`, bodyParams, { headers });
};

module.exports[createNode] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.post(`${host}/users/${id}/nodes`, bodyParams, { headers });
};

module.exports[verifyAchMfa] = ({ access_token, mfa_answer, userInfo }) => {
  const { host, headers, id} = userInfo;

  return axios.post(
    `${host}/users/${id}/nodes`,
    {
      access_token,
      mfa_answer
    },
    { headers }
  );
};

module.exports[getAllUserNodes] = ({ page, per_page, type, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes`,
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

module.exports[getUserTransactions] = ({ page, per_page, filter, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    // STATIC ENDPOINT
    originalUrl: `${host}/users/${id}/trans`,
    page,
    per_page,
    filter
  });

  return axios.get(url, { headers });
};

module.exports[triggerDummyTransactions] = ({ node_id, amount, foreign_transaction, is_credit, subnet_id, type, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}/dummy-tran`,
    amount,
    foreign_transaction,
    is_credit,
    subnet_id,
    type
  });

  return axios.get(url, { headers });
};

module.exports[generateUboForm] = ({ bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/ubo`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[getStatementsByUser] = ({ page, per_page, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/statements`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getStatementsByNode] = ({ node_id, page, per_page, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}/statements`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[shipCardNode] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}?ship=yes`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[resetCardNode] = ({ node_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}?reset=yes`;

  return axios.patch(url, {}, { headers });
};

module.exports[verifyMicroDeposits] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}`;

  return axios.patch(url, bodyParams, { headers });
};

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

module.exports[generateApplePayToken] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/applepay`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[generateECashBarcode] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/barcode`;

  return axios.post(url, bodyParams, { headers });
};

module.exports[createTransaction] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans`;

  return axios.post(url, bodyParams, { headers });
};

module.exports[createBatchTransactions] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/batch-trans`;

  return axios.post(url, bodyParams, { headers });
};

module.exports[getTransaction] = ({ node_id, trans_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

  return axios.get(url, { headers });
};

module.exports[getAllNodeTransactions] = ({ node_id, trans_id, page, per_page, filter, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}/trans`,
    page,
    per_page,
    filter
  });

  return axios.get(url, { headers });
};

module.exports[deleteTransaction] = ({ node_id, trans_id, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

  return axios.delete(url, { headers });
};

module.exports[commentOnStatus] = ({ node_id, trans_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[disputeCardTransaction] = ({ node_id, trans_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}/dispute`;
  const config = {
    "headers": headers,
    "maxContentLength": 30 * 1048576,  // 30MiB is configured by the server.
    "maxBodyLength": 30 * 1048576
  };
  return axios.patch(url, bodyParams, config);
};

module.exports[getAllSubnets] = ({ node_id, page, per_page, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl: `${host}/users/${id}/nodes/${node_id}/subnets`,
    page,
    per_page
  });

  return axios.get(url, { headers });
};

module.exports[getSubnet] = ({ node_id, subnet_id, full_dehydrate, userInfo }) => {
  const { host, headers, id } = userInfo;
  let url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;
  if (full_dehydrate) {
    url = addQueryParams({
      originalUrl: url,
      full_dehydrate: 'yes',
    });
  }

  return axios.get(url, { headers });
};

module.exports[createSubnet] = ({ node_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/subnets`;

  return axios.post(url, bodyParams, { headers });
};

module.exports[updateSubnet] = ({ node_id, subnet_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[shipCard] = ({ node_id, subnet_id, bodyParams, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship`;

  return axios.patch(url, bodyParams, { headers });
};

module.exports[getAllCardShipments] = ({ node_id, subnet_id, page, per_page, userInfo }) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl : `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship`,
    page,
    per_page
  }) 
  return axios.get(url, { headers });
};

module.exports[getCardShipment] = ({ node_id, subnet_id, shipment_id, userInfo}) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl : `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship/${shipment_id}`
  }) 
  return axios.get(url, { headers });
};

module.exports[deleteCardShipment] = ({ node_id, subnet_id, shipment_id, userInfo}) => {
  const { host, headers, id } = userInfo;
  const url = addQueryParams({
    originalUrl : `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship/${shipment_id}`
  }) 
  return axios.get(url, { headers });
};

module.exports[registerNewFingerprint] = ({ refresh_token, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.post(
    `${host}/oauth/${id}`,
    {
      refresh_token
    },
    { headers }
  );
};

module.exports[supplyDevice2FA] = ({ device, refresh_token, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.post(
    `${host}/oauth/${id}`,
    {
      refresh_token,
      "phone_number": device
    },
    { headers }
  );
};

module.exports[verifyFingerprint2FA] = ({ validation_pin, refresh_token, userInfo }) => {
  const { host, headers, id } = userInfo;

  return axios.post(
    `${host}/oauth/${id}`,
    {
      refresh_token,
      validation_pin
    },
    { headers }
  );
};
