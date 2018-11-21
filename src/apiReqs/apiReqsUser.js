const axios = require('axios');

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
