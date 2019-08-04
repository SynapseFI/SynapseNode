const {
  addUserKyc,
  deleteExistingDocument,
  updateUser,
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
  getUser,
  updateIpAddress
} = require('../constants/apiReqNames');

const apiRequests = require('../apiReqs/apiRequests');
const buildHeaders = require('../helpers/buildHeaders');

class User {
  constructor({
    data,
    headerObj,
    client
  }) {
    this.id = data._id;
    this.body = data;
    this.host = client.host;
    this.fingerprint = headerObj.fingerprint;
    this.ip_address = headerObj.ip_address;
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

  // PATCH ADD USER KYC
  addUserKyc(bodyParams = {}) {
    return apiRequests.user[addUserKyc]({
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

  // RETRIEVE REFRESH TOKEN
  _grabRefreshToken() {
    return apiRequests.client[getUser]({
      user_id: this.id,
      full_dehydrate: 'no',
      headers: this.headers,
      clientInfo: this.client
    })
    .then(({ data }) => {
      return data.refresh_token;
    });
  }

  // POST OAUTH USER
  _oauthUser(bodyParams = {}) {
    return apiRequests.user[_oauthUser]({
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
  createNode(bodyParams = {}, idempotency_key = null) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client.client_id,
        client_secret: this.client.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        oauth_key: this.oauth_key,
        idempotency_key
      });
    }

    return apiRequests.user[createNode]({
      bodyParams,
      userInfo: this
    });
  }

  // POST ACH-US MFA
  // submit answer to a mfa question from bank login attempt
  verifyAchMfa(access_token, mfa_answer, idempotency_key = null) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client.client_id,
        client_secret: this.client.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        oauth_key: this.oauth_key,
        idempotency_key
      });
    }

    return apiRequests.user[verifyAchMfa]({
      access_token,
      mfa_answer,
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
  triggerDummyTransactions(node_id, queryParams = {}) {
    const { foreign_transaction, is_credit, subnet_id, type } = queryParams;

    return apiRequests.user[triggerDummyTransactions]({
      node_id,
      foreign_transaction,
      is_credit,
      subnet_id,
      type,
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

  // PATCH SHIP DEBIT CARD NODE
  shipCardNode(node_id, bodyParams) {
    return apiRequests.user[shipDebitCard]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH RESET DEBIT CARD NODE
  resetCardNode(node_id) {
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
  createTransaction(node_id, bodyParams, idempotency_key = null) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client.client_id,
        client_secret: this.client.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        oauth_key: this.oauth_key,
        idempotency_key
      });
    }

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
  disputeCardTransaction(node_id, trans_id, bodyParams) {
    return apiRequests.user[disputeCardTransaction]({
      node_id,
      trans_id,
      bodyParams,
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
  getSubnet(node_id, subnet_id, queryParams = {}) {
    const { full_dehydrate } = queryParams;
    return apiRequests.user[getSubnet]({
      node_id,
      subnet_id,
      full_dehydrate,
      userInfo: this
    });
  }

  // POST CREATE SUBNET
  createSubnet(node_id, bodyParams, idempotency_key = null) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client.client_id,
        client_secret: this.client.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        oauth_key: this.oauth_key,
        idempotency_key
      });
    }

    return apiRequests.user[createSubnet]({
      node_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH UPDATE SUBNET
  updateSubnet(node_id, subnet_id, bodyParams = {}) {
    return apiRequests.user[updateSubnet]({
      node_id,
      subnet_id,
      bodyParams,
      userInfo: this
    });
  }

  // PATCH SHIP CARD SUBNET
  shipCard(node_id, subnet_id, bodyParams ={}) {
    return apiRequests.user[shipCard]({
      node_id,
      subnet_id,
      bodyParams,
      userInfo: this
    });
  }

  // POST First call for registering new fingerprint
  async registerNewFingerprint(fp) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    return apiRequests.user[registerNewFingerprint]({
      refresh_token,
      userInfo: this
    });
  }

  // POST Second call for registering new fingerprint
  async supplyDevice2FA(fp, device) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    return apiRequests.user[supplyDevice2FA]({
      device,
      refresh_token,
      userInfo: this
    });
  }

  // POST Final call for registering new fingerprint
  async verifyFingerprint2FA(fp, validation_pin) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    return apiRequests.user[verifyFingerprint2FA]({
      validation_pin,
      refresh_token,
      userInfo: this
    });
  }

  // UPDATE USER IP ADDRESS
  updateIpAddress(ip) {
    this.ip_address = ip;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });
    return this.headers;
  }
}

module.exports = User;
