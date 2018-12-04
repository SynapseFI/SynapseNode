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
  triggerDummyTransactions,
  generateUboForm,
  getStatementsByUser,
  getStatementsByNode,
  shipDebitCard,
  resetDebitCard,
  verifyMicroDeposits
  // STARTING FROM REINITIATE MICRO-DEPOSITS
} = require('../constants/apiReqNames');

const apiRequests = require('../apiReqs/apiRequests');
const buildHeaders = require('../helpers/buildHeaders');

class User {
  constructor({
    data,
    client
  }) {
    this.id = data._id;
    this.body = data;
    this.host = client.host;
    this.fingerprint = client.fingerprint;
    this.ip_address = client.ip_address;
    this.oauth_key = '';
    this.client = client;

    this.headers = buildHeaders({
      client_id: client.client_id,
      client_secret: client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });
  }

  // PATCH ADD NEW DOCUMENTS
  addNewDocuments(bodyParams = {}) {
    return apiRequests.user[addNewDocuments]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH UPDATE EXISTING DOCUMENT
  updateExistingDocument(bodyParams = {}) {
    return apiRequests.user[updateExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH DELETE EXISTING DOCUMENT
  deleteExistingDocument(bodyParams = {}) {
    return apiRequests.user[deleteExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH UPDATE USER
  updateUser(bodyParams = {}) {
    return apiRequests.user[updateUser]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // REFRESH TOKEN
  _refresh() {
    return apiRequests.client[getUser]({
      user_id: this.id,
      full_dehydrate: 'no',
      clientInfo: this.client
    })
    .then(({ data }) => {
      return data.refresh_token;
    });
  }

  // POST OAUTH USER
  oauthUser(bodyParams = {}) {
    return apiRequests.user[oauthUser]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    })
    .then(({ data }) => {
      this.oauth_key = data.oauth_key;

      this.headers = buildHeaders({
        client_id: this.client.client_id,
        client_secret: this.client.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        oauth_key: this.oauth_key
      });

      return data;
    });
  }

  // POST CREATE NODE
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
  triggerDummyTransactions(node_id, is_credit = false) {
    return apiRequests.user[triggerDummyTransactions]({
      user_id: this.id,
      node_id,
      is_credit,
      userInfo: this
    });
  }

  // PATCH GENERATE UBO FORM
  generateUboForm(bodyParams) {
    return apiRequests.user[generageUboForm]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // GET STATEMENTS BY USER
  getStatementsByUser(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getStatementsByUser]({
      user_id: this.id,
      page,
      per_page,
      userInfo: this
    });
  }

  // GET STATEMENTS BY NODE
  getStatementsByNode(node_id, queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getStatementsByNode]({
      user_id: this.id,
      node_id,
      page,
      per_page,
      userInfo: this
    });
  }

  // PATCH SHIP DEBIT CARD
  shipDebitCard(node_id, bodyParams) {
    return apiRequests.user[shipDebitCard]({
      user_id: this.id,
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH RESET DEBIT CARD
  resetDebitCard(node_id) {
    return apiRequests.user[resetDebitCard]({
      user_id: this.id,
      node_id,
      userInfo: this
    });
  }

  // PATCH VERIFY MICRO-DEPOSITS
  verifyMicroDeposits(node_id, bodyParams) {
    return apiRequests.user[verifyMicroDeposits]({
      user_id: this.id,
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // !!!!!!!! WILL NEED TO REFACTOR/REMOVE USER_ID FROM METHODS ABOVE !!!!!!!!
  // PATCH REINITIATE MICRO-DEPOSITS
  reinitiateMicroDeposits(node_id) {
    return apiRequests.user[reinitiateMicroDeposits]({
      node_id,
      userInfo: this
    });
  }

  // PATCH UPDATE NODE
  updateNode(node_id, bodyParams) {
    return apiRequests.user[updateNode]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // DELETE NODE
  deleteNode(node_id) {
    return apiRequests.user[deleteNode]({
      node_id,
      userInfo: this
    });
  }

  
}

module.exports = User;
