import {
  createUser,
  getAllUsers,
  getUser,
  getPlatformTransactions,
  getUserTransactions,
  getPlatformNodes,
  getInstitutions,
  issuePublicKey,
  createSubscription,
  getAllSubscriptions,
  getSubscription,
  updateSubscription,
  locateAtms,
  getCryptoQuotes,
  getCryptoMarketData,
  getWebhookLogs,
  getTradeMarketData,
  verifyAddress,
  verifyRoutingNumber
} from '../constants/apiReqNames';

import apiRequests from '../apiReqs/apiRequests';
import buildHeaders from '../helpers/buildHeaders';
const { checkOptions, instantiateUser } = require('../helpers/clientHelpers');
import { IHeadersObject, IQueryParams } from '../interfaces/helpers';

class Client {
  client_id: string;
  client_secret: string;
  fingerprint: string;
  ip_address: string;
  host: string;
  isProduction: boolean;
  headers: IHeadersObject;

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
  async createUser(bodyParams, ip_address, options = null) {
    let headerObj = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address
    };

    if (options) {
      headerObj = checkOptions(headerObj, options);
    }

    const headers = buildHeaders(headerObj);

    const { data } = await apiRequests.client[createUser]({
      bodyParams,
      headers,
      clientInfo: this
    });

    return instantiateUser({ data, headerObj, client: this });
  }

  // GET ALL USERS
  getAllUsers(queryParams: IQueryParams = {}) {
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
  async getUser(user_id, options = null) {
    let headerObj = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      full_dehydrate: false
    };

    if (options) {
      headerObj = checkOptions(headerObj, options);
    }

    const headers = buildHeaders(headerObj);

    const { data } = await apiRequests.client[getUser]({
      user_id,
      full_dehydrate: headerObj.full_dehydrate,
      headers,
      clientInfo: this
    });

    return instantiateUser({ data, headerObj, client: this });
  }

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;

    return apiRequests.client[getPlatformTransactions]({
      page,
      per_page,
      filter,
      clientInfo: this
    });
  }

  // GET ALL PLATFORM NODES
  getPlatformNodes(queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;

    return apiRequests.client[getPlatformNodes]({
      page,
      per_page,
      filter,
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
  issuePublicKey(scope = ['OAUTH|POST', 'USERS|POST', 'USERS|GET', 'USER|GET', 'USER|PATCH', 'SUBSCRIPTIONS|GET', 'SUBSCRIPTIONS|POST', 'SUBSCRIPTION|GET', 'SUBSCRIPTION|PATCH', 'CLIENT|REPORTS', 'CLIENT|CONTROLS'], userId = null) {
    return apiRequests.client[issuePublicKey]({
      scope,
      clientInfo: this,
      userId
    });
  }

  // POST CREATE SUBSCRIPTION
  createSubscription(url, scope = ['USERS|POST', 'USER|PATCH', 'NODES|POST', 'NODE|PATCH', 'TRANS|POST', 'TRAN|PATCH'], idempotency_key = null) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client_id,
        client_secret: this.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        idempotency_key
      });
    }

    return apiRequests.client[createSubscription]({
      url,
      scope,
      clientInfo: this
    });
  }

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;

    return apiRequests.client[getAllSubscriptions]({
      page,
      per_page,
      clientInfo: this
    });
  }

  // GET SUBSCRIPTION W/ SUBSCRIPTION_ID
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

  // GET LOCATE ATMS
  locateAtms(queryParams: IQueryParams = {}) {
    const { page, per_page, zip, radius, lat, lon } = queryParams;

    return apiRequests.client[locateAtms]({
      page,
      per_page,
      zip,
      radius,
      lat,
      lon,
      clientInfo: this
    });
  }

  // GET Verify Address
    verifyAddress(queryParams: IQueryParams = {}) {
      const {
        address_city,
        address_country_code,
        address_postal_code,
        address_street,
        address_subdivision
      } = queryParams;

      return apiRequests.client[verifyAddress]({
        address_city,
        address_country_code,
        address_postal_code,
        address_street,
        address_subdivision,
        clientInfo: this
      });
    }

  // GET Verify Routing Number
    verifyRoutingNumber(queryParams: IQueryParams = {}) {
      const {routing_num, type } = queryParams;
      return apiRequests.client[verifyRoutingNumber]({
        routing_num,
        type,
        clientInfo: this
      });
    }    

  // GET CRYPTO QUOTES
  getCryptoQuotes() {
    return apiRequests.client[getCryptoQuotes]({
      clientInfo: this
    });
  }

  // GET CRYPTO MARKET DATA
  getCryptoMarketData(queryParams: IQueryParams = {}) {
    const { limit, currency } = queryParams;

    return apiRequests.client[getCryptoMarketData]({
      limit,
      currency,
      clientInfo: this
    });
  }

  // GET WEBHOOK LOGS
  getWebhookLogs() {
    return apiRequests.client[getWebhookLogs]({
      clientInfo: this
    });
  }

  // GET TRADE MARKET DATA
  getTradeMarketData(queryParams: IQueryParams = {}) {
    const { ticker } = queryParams;

    return apiRequests.client[getTradeMarketData]({
      ticker,
      clientInfo: this
    });
  }
}

export default Client;
