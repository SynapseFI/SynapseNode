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
      clientInfo: this
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
      clientInfo: this
    });
  }

  // GET USER W/ USER_ID
  getUser(user_id, full_dehydrate = 'no') {
    return apiRequests.client[getUser]({
      user_id,
      full_dehydrate,
      clientInfo: this
    });
  }

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getPlatformTransactions]({
      page,
      per_page,
      clientInfo: this
    });
  }

  // GET ALL PLATFORM NODES
  getPlatformNodes(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getPlatformNodes]({
      page,
      per_page,
      clientInfo: this
    });
  }

  // GET INSTITUTIONS
  getInstitutions() {
    return apiRequests.client[getInstitutions]({
      clientInfo: this
    });
  }

  // GET ISSUE PUBLIC KEY
  issuePublicKey(scope = ['OAUTH|POST', 'USERS|POST', 'USERS|GET', 'USER|GET', 'USER|PATCH', 'SUBSCRIPTIONS|GET', 'SUBSCRIPTIONS|POST', 'SUBSCRIPTION|GET', 'SUBSCRIPTION|PATCH', 'CLIENT|REPORTS', 'CLIENT|CONTROLS']) {
    return apiRequests.client[issuePublicKey]({
      scope,
      clientInfo: this
    })
    .then(({ data }) => {
      return {data: data.public_key_obj};
    });
  }

  // POST CREATE SUBSCRIPTION
  createSubscription(url, scope = ['USERS|POST', 'USER|PATCH', 'NODES|POST', 'NODE|PATCH', 'TRANS|POST', 'TRAN|PATCH']) {
    return apiRequests.client[createSubscription]({
      url,
      scope,
      clientInfo: this
    });
  }

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(queryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getAllSubscriptions]({
      page,
      per_page,
      clientInfo: this
    });
  }

  // GET SUBSCRIPTION
  getSubscription(subscription_id) {
    return apiRequests.client[getSubscription]({
      subscription_id,
      clientInfo: this
    });
  }

  // PATCH UPDATE SUBSCRIPTION
  updateSubscription(subscription_id, bodyParams = {}) {
    return apiRequests.client[updateSubscription]({
      subscription_id,
      bodyParams,
      clientInfo: this
    });
  }
}

module.exports = Client;
