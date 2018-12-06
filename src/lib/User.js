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
  verifyMicroDeposits,
  reinitiateMicroDeposits,
  updateNode,
  deleteNode,
  generateApplePayToken,
  createTransaction,
  getTransaction,
  getAllNodeTransactions,
  deleteTransaction,
  commentOnStatus,
  disputeCardTransaction,
  getAllSubnets,
  getSubnet,
  createSubnet
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
      bodyParams,
      userInfo: this
    });
  }

  // PATCH UPDATE EXISTING DOCUMENT
  updateExistingDocument(bodyParams = {}) {
    return apiRequests.user[updateExistingDocument]({
      bodyParams,
      userInfo: this
    });
  }

  // PATCH DELETE EXISTING DOCUMENT
  deleteExistingDocument(bodyParams = {}) {
    return apiRequests.user[deleteExistingDocument]({
      bodyParams,
      userInfo: this
    });
  }

  // PATCH UPDATE USER
  updateUser(bodyParams = {}) {
    return apiRequests.user[updateUser]({
      bodyParams,
      userInfo: this
    });
  }

  // REFRESH TOKEN
  _refresh() {
    return apiRequests.client[getUser]({
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
      bodyParams,
      userInfo: this
    });
  }

  // GET ALL USER NODES
  getAllUserNodes(queryParams = {}) {
    const { page, per_page, type } = queryParams;

    return apiRequests.user[getAllUserNodes]({
      page,
      per_page,
      type,
      userInfo: this
    });
  }

  // GET NODE W/ NODE_ID
  getNode(node_id, queryParams = {}) {
    const { full_dehydrate, force_refresh } = queryParams;

    return apiRequests.user[getNode]({
      node_id,
      full_dehydrate,
      force_refresh,
      userInfo: this
    });
  }

  // GET ALL USER TRANSACTIONS
  getUserTransactions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getUserTransactions]({
      page,
      per_page,
      userInfo: this
    });
  }

  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(node_id, is_credit = false) {
    return apiRequests.user[triggerDummyTransactions]({
      node_id,
      is_credit,
      userInfo: this
    });
  }

  // PATCH GENERATE UBO FORM
  generateUboForm(bodyParams) {
    return apiRequests.user[generateUboForm]({
      bodyParams,
      userInfo: this
    });
  }

  // GET STATEMENTS BY USER
  getStatementsByUser(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getStatementsByUser]({
      page,
      per_page,
      userInfo: this
    });
  }

  // GET STATEMENTS BY NODE
  getStatementsByNode(node_id, queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getStatementsByNode]({
      node_id,
      page,
      per_page,
      userInfo: this
    });
  }

  // PATCH SHIP DEBIT CARD
  shipDebitCard(node_id, bodyParams) {
    return apiRequests.user[shipDebitCard]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH RESET DEBIT CARD
  resetDebitCard(node_id) {
    return apiRequests.user[resetDebitCard]({
      node_id,
      userInfo: this
    });
  }

  // PATCH VERIFY MICRO-DEPOSITS
  verifyMicroDeposits(node_id, bodyParams) {
    return apiRequests.user[verifyMicroDeposits]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

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

  // PATCH GENERATE APPLE PAY TOKEN
  generateApplePayToken(node_id, bodyParams) {
    return apiRequests.user[generateApplePayToken]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // POST CREATE TRANSACTION
  createTransaction(node_id, bodyParams) {
    return apiRequests.user[createTransaction]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // GET TRANSACTION W/ TRANSACTION_ID
  getTransaction(node_id, trans_id) {
    return apiRequests.user[getTransaction]({
      node_id,
      trans_id,
      userInfo: this
    });
  }

  // GET ALL NODE TRANSACTIONS
  getAllNodeTransactions(node_id, queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getAllNodeTransactions]({
      node_id,
      page,
      per_page,
      userInfo: this
    });
  }

  // DELETE TRANSACTION
  deleteTransaction(node_id, trans_id) {
    return apiRequests.user[deleteTransaction]({
      node_id,
      trans_id,
      userInfo: this
    });
  }

  // PATCH COMMENT ON STATUS
  commentOnStatus(node_id, trans_id, bodyParams) {
    return apiRequests.user[commentOnStatus]({
      node_id,
      trans_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH DISPUTE CARD TRANSACTION
  disputeCardTransaction(node_id, trans_id) {
    return apiRequests.user[disputeCardTransaction]({
      node_id,
      trans_id,
      userInfo: this
    });
  }

  // GET ALL SUBNETS
  getAllSubnets(node_id, queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.user[getAllSubnets]({
      node_id,
      page,
      per_page,
      userInfo: this
    });
  }

  // GET SUBNET W/ SUBNET_ID
  getSubnet(node_id, subnet_id) {
    return apiRequests.user[getSubnet]({
      node_id,
      subnet_id,
      userInfo: this
    });
  }

  // POST CREATE SUBNET
  createSubnet(node_id, bodyParams) {
    return apiRequests.user[createSubnet]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // UPDATE SUBNET???????
}

module.exports = User;
