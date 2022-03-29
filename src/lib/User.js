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
  pushToMobileWallet,
  shipCard,
  registerNewFingerprint,
  supplyDevice2FA,
  verifyFingerprint2FA,
  getUser,
  updateIpAddress,
  createBatchTransactions,
  getAllCardShipments,
  getCardShipment,
  deleteCardShipment
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
  
  /**
   * GET ALL USER DUPLICATES 
   * 
   * @returns Promise
   * 
   * [Get User Duplicates Docs]{@link https://docs.synapsefi.com/api-references/users/manage-duplicates#example-request}
   */
  getUserDuplicates() {
    const { page, per_page } = queryParams 
    return apiRequests.user[getUserDuplicates]({
      userInfo: this
    })
  }

  /**
   * SWAP DUPLICATE USER
   * @param {String} swap_to_user_id required: User ID you'd like to swap the open status with
   * 
   * @returns Promise
   * 
   * [Swap Duplicate User Docs]{@link https://docs.synapsefi.com/api-references/users/manage-duplicates#example-request-1}
   */
  swapDuplicateUsers(swap_to_user_id) {
    bodyParams = {
      "swap_to_user_id":swap_to_user_id
    }
    return apiRequests.user[swapDuplicateUsers]({
      bodyParams,
      userInfo: this
    })
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
    const { page, per_page, filter } = queryParams;

    return apiRequests.user[getUserTransactions]({
      page,
      per_page,
      filter,
      userInfo: this
    });
  }

  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(node_id, queryParams = {}) {
    const { amount, foreign_transaction, is_credit, subnet_id, type } = queryParams;

    return apiRequests.user[triggerDummyTransactions]({
      node_id,
      amount,
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

  /**
   * 
   * @param {String} node_id required: id of node on which to create bulk transactions
   * @param {Object} bodyParams required: body of post request, must have transactions key, which is an array of transaction objects
   * @param {Array} bodyParams.transactions
   * 
   * @returns Promise
   * 
   * Idempotency keys can be provided for each transaction, inside each transaction object's `extra` key.
   * 
   * e.g. `{ transactions: [{ extra: { idempotency_key: 'idemPotKeyStr' } }] }`
   * 
   * [Batch Transaction Docs]{@link https://docs.synapsefi.com/api-references/transactions/create-batch-transactions}
   * [Trans Object Details]{@link https://docs.synapsefi.com/api-references/transactions/transaction-object-details}
   */
  createBatchTransactions(node_id, bodyParams) {
    return apiRequests.user[createBatchTransactions]({
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
    const { page, per_page, filter } = queryParams;

    return apiRequests.user[getAllNodeTransactions]({
      node_id,
      page,
      per_page,
      filter,
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

  // POST PUSH CARD SUBNET
  pushToMobileWallet(node_id, subnet_id, bodyParams={}) {
    return apiRequests.user[pushToMobileWallet]({
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

  /**
   * GET ALL CARD SHIPMENTS
   * @param {String} node_id required: id of node belonging to the subnet
   * @param {String} subnet_id required: id of card subnet for the card shipments
   * @param {Object} queryParams optional: body of post request, can contain page and per_page keys indicating the amount of card shipments returned  
   * 
   * @returns Promise
   * 
   * 
   * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/view-all-subnet-shipments}
   */
  getAllCardShipments(node_id, subnet_id, queryParams={}) {
    const { page, per_page } = queryParams 
    return apiRequests.user[getAllCardShipments]({
      node_id, 
      subnet_id,
      page,
      per_page,
      userInfo: this
    })
  }

  /**
   * GET A SINGLE CARD SHIPMENT
   * @param {String} node_id required: id of node belonging to the subnet
   * @param {String} subnet_id required: id of card subnet for the card shipments
   * @param {Object} shipment_id requred: id of card shipment  
   * 
   * @returns Promise
   * 
   * 
   * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/view-shipment}
   */
  getCardShipment(node_id, subnet_id, shipment_id) {
    return apiRequests.user[getCardShipment]({
      node_id, 
      subnet_id,
      shipment_id,
      userInfo: this
    })
  }

  /**
   * DELETE A SINGLE CARD SHIPMENT
   * @param {String} node_id required: id of node belonging to the subnet
   * @param {String} subnet_id required: id of card subnet for the card shipments
   * @param {Object} shipment_id requred: id of card shipment  
   * 
   * @returns Promise
   * 
   * 
   * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/cancel-shipment}
   */
  deleteCardShipment(node_id, subnet_id, shipment_id) {
    return apiRequests.user[deleteCardShipment]({
      node_id, 
      subnet_id,
      shipment_id,
      userInfo: this
    })
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
