const {
  createUser,
  getAllUsers,
  getUser,
  getPlatformTransactions,
  getUserTransactions,
  getPlatformNodes,
  getInstitutions,
  triggerDummyTransactions,
  issuePublicKey,
  createSubscription,
  getAllSubscriptions,
  getSubscription,
  updateSubscription
} = require('../constants/apiReqNames');

const apiRequests = require('../apiReqs/apiRequests');
const buildHeaders = require('../helpers/buildHeaders');

class Client {
  constructor({
    client_id,
    client_secret,
    fingerprint,
    ip_address,
    isProduction
  }) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.fingerprint = fingerprint;
    this.ip_address = ip_address;
    this.isProduction = isProduction;
    this.host = isProduction ? 'https://api.synapsefi.com/v3.1' : 'https://uat-api.synapsefi.com/v3.1';
    this.headers = buildHeaders({ client_id, client_secret, fingerprint, ip_address });
  }

  // POST CREATE USER
  createUser({ logins, phone_numbers, legal_names, bodyParams }) {
    return apiRequests.client[createUser]({
      logins,
      phone_numbers,
      legal_names,
      bodyParams,
      userInfo: this
    });
  }

  // GET ALL USERS
  getAllUsers(queryParams = {}) {
    const { query, page, per_page, show_refresh_tokens } = queryParams;

    return apiRequests.client[getAllUsers]({
      query,
      page,
      per_page,
      show_refresh_tokens,
      userInfo: this
    });
  }

  // GET USER W/ USER_ID
  getUser(user_id, full_dehydrate = 'no') {
    return apiRequests.client[getUser]({
      user_id,
      full_dehydrate,
      userInfo: this
    });
  }

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getPlatformTransactions]({
      page,
      per_page,
      userInfo: this
    });
  }

  // MOVE TO USER OBJECT!!!
  // GET ALL USER TRANSACTIONS
  getUserTransactions(user_id, queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getUserTransactions]({
      user_id,
      page,
      per_page,
      userInfo: this
    });
  }

  // GET ALL PLATFORM NODES
  getPlatformNodes(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getPlatformNodes]({
      page,
      per_page,
      userInfo: this
    });
  }

  // GET INSTITUTIONS
  getInstitutions() {
    return apiRequests.client[getInstitutions]({
      userInfo: this
    });
  }

  // MOVE TO USER OBJECT!!!
  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(user_id, node_id, is_credit = 'no') {
    return apiRequests.client[triggerDummyTransactions]({
      user_id,
      node_id,
      is_credit,
      userInfo: this
    });
  }

  // GET ISSUE PUBLIC KEY
  issuePublicKey(scope = ['OAUTH|POST', 'USERS|POST', 'USERS|GET', 'USER|GET', 'USER|PATCH', 'SUBSCRIPTIONS|GET', 'SUBSCRIPTIONS|POST', 'SUBSCRIPTION|GET', 'SUBSCRIPTION|PATCH', 'CLIENT|REPORTS', 'CLIENT|CONTROLS']) {
    return apiRequests.client[issuePublicKey]({
      scope,
      userInfo: this
    });
  }

  // POST CREATE SUBSCRIPTION
  createSubscription(url, scope = ['USERS|POST', 'USER|PATCH', 'NODES|POST', 'NODE|PATCH', 'TRANS|POST', 'TRAN|PATCH']) {
    return apiRequests.client[createSubscription]({
      url,
      scope,
      userInfo: this
    });
  }

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getAllSubscriptions]({
      page,
      per_page,
      userInfo: this
    });
  }

  // GET SUBSCRIPTION
  getSubscription(subscription_id) {
    return apiRequests.client[getSubscription]({
      subscription_id,
      userInfo: this
    });
  }

  // PATCH UPDATE SUBSCRIPTION
  updateSubscription(subscription_id, bodyParams = {}) {
    return apiRequests.client[updateSubscription]({
      subscription_id,
      bodyParams,
      userInfo: this
    });
  }
}

module.exports = Client;
