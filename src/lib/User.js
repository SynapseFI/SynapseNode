const {
  addNewDocuments,
  updateExistingDocument,
  deleteExistingDocument,
  updateUser,
  // refresh ?
  // oauth
  createNode,
  getAllUserNodes,
  getUserTransactions,
  triggerDummyTransactions
} = require('../constants/apiReqNames');

const apiRequests = require('../apiReqs/apiRequests');
const buildHeaders = require('../helpers/buildHeaders');

class User {
  constructor({
    id,
    fingerprint,
    oauth_key,
    refresh_token,
    ip_address,
    client
  }) {
    this.id = id;
    this.fingerprint = fingerprint;
    this.oauth_key = oauth_key;
    this.refresh_token = refresh_token;
    this.ip_address = ip_address;
    this.client = client;
  }

  // ADD NEW DOCUMENTS
  addNewDocuments(bodyParams = {}) {
    return apiRequests.user[addNewDocuments]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // UPDATE EXISTING DOCUMENT
  updateExistingDocument(bodyParams = {}) {
    return apiRequests.user[updateExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // DELETE EXISTING DOCUMENTS
  deleteExistingDocument(bodyParams = {}) {
    return apiRequests.user[deleteExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // UPDATE USER
  updateUser(bodyParams = {}) {
    return apiRequests.user[updateUser]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // REFRESH?

  // OAUTH

  // CREATE NODE
  createNode(bodyParams = {}) {
    return apiRequests.user[createNode]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // GET ALL USER NODES
  getAllUserNodes(queryParams = {}) {
    const { page, per_page, type } = queryParams;

    return apiRequests.user[getAllUserNodes]({
      user_id: this.id,
      page,
      per_page,
      type,
      userInfo: this
    });
  }

  // GET ALL USER TRANSACTIONS
  getUserTransactions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getUserTransactions]({
      user_id: this.id,
      page,
      per_page,
      userInfo: this
    });
  }

  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(node_id, is_credit = 'no') {
    return apiRequests.user[triggerDummyTransactions]({
      user_id: this.id,
      node_id,
      is_credit,
      userInfo: this
    });
  }
}

module.exports = User;
