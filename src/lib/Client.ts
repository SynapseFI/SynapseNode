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
import buildHeaders, { makePostPatchConfig } from '../helpers/buildHeaders';
import { checkOptions, instantiateUser } from '../helpers/clientHelpers';
import { IHeadersObject, IQueryParams } from '../interfaces/helpers';
import axios from 'axios';
import { addQueryParams } from '../helpers/buildUrls';

class Client {
  client_id: string;
  client_secret: string;
  fingerprint: string;
  ip_address: string;
  host: string;
  isProduction: boolean;
  headers: IHeadersObject;
  _default_public_key_scopes: string[];
  _default_subscription_scopes: string[];

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
    this._default_public_key_scopes = [
      'OAUTH|POST',
      'USERS|POST',
      'USERS|GET',
      'USER|GET',
      'USER|PATCH',
      'SUBSCRIPTIONS|GET',
      'SUBSCRIPTIONS|POST',
      'SUBSCRIPTION|GET',
      'SUBSCRIPTION|PATCH',
      'CLIENT|REPORTS',
      'CLIENT|CONTROLS',
    ];
    this._default_subscription_scopes = [
      'USERS|POST',
      'USER|PATCH',
      'NODES|POST',
      'NODE|PATCH',
      'TRANS|POST',
      'TRAN|PATCH',
    ];
  }

  // POST CREATE USER
  async createUser(bodyParams, ip_address, options = null) {
    let headerObj = checkOptions({ ...this.headers, ip_address }, options);

    const headers = buildHeaders(headerObj);
    const config = makePostPatchConfig(headers);
    const { data } = await axios.post(`${this.host}/users`, bodyParams, config);

    return instantiateUser({ data, headerObj, client: this });
  };

  // GET ALL USERS
  getAllUsers(queryParams: IQueryParams = {}) {
    const { query, page, per_page, show_refresh_tokens } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/users`;

    const urlWithParams = addQueryParams({
      originalUrl,
      query,
      page,
      per_page,
      show_refresh_tokens,
    })

    return axios.get(urlWithParams, { headers });
  };

  // GET USER W/ USER_ID
  async getUser(user_id, options: { [index: string]: string } | null = null) {
    let headerObj = checkOptions(this.headers, options);

    const headers = buildHeaders(headerObj);
    const { host } = this;
    const originalUrl = `${host}/users/${user_id}`

    const full_dehydrate = options?.full_dehydrate ? 'yes' : 'no';
    const urlWithParams = addQueryParams({ originalUrl, full_dehydrate });
    const { data } = await axios.get(urlWithParams, { headers });

    return instantiateUser({ data, headerObj, client: this });
  };

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/trans`;
    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      filter,
    });

    return axios.get(urlWithParams, { headers });
  };

  // GET ALL PLATFORM NODES
  getPlatformNodes(queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/nodes`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      filter,
    });

    return axios.get(urlWithParams, { headers });
  };

  // GET INSTITUTIONS
  getInstitutions() {
    const { host, headers } = this;
    const url = `${host}/institutions`
    return axios.get(url, { headers });
  };

  // GET ISSUE PUBLIC KEY
  issuePublicKey(scope = this._default_public_key_scopes, userId: string | null = null) {
    const { host, headers } = this;
    let url = `${host}/client?issue_public_key=yes&scope=${scope.join()}`;
    if (userId) {
      url = url += `&user_id=${userId}`;
    };

    return axios.get(url, { headers });
  };

  // POST CREATE SUBSCRIPTION
  createSubscription(
    subscriptionUrl: string,
    scope: string[] = this._default_subscription_scopes,
    idempotency_key: string | null = null
  ) {
    if (idempotency_key) {
      this.headers = buildHeaders({
        client_id: this.client_id,
        client_secret: this.client_secret,
        fingerprint: this.fingerprint,
        ip_address: this.ip_address,
        idempotency_key
      });
    }

    const { host, headers } = this;
    const url = `${host}/subscriptions`;
    const bodyParams = { url: subscriptionUrl, scope };

    return axios.post(url, bodyParams, { headers });
  };

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/subscriptions`;

    const urlWithParams = addQueryParams({ originalUrl, page, per_page });

    return axios.get(urlWithParams, { headers });
  };

  // GET SUBSCRIPTION W/ SUBSCRIPTION_ID
  getSubscription(subscription_id) {
    const { host, headers } = this;
    const url = `${host}/subscriptions/${subscription_id}`;
    return axios.get(url, { headers });
  };

  // PATCH UPDATE SUBSCRIPTION
  updateSubscription(subscription_id, bodyParams = {}) {
    const { host, headers } = this;
    const url = `${host}/subscriptions/${subscription_id}`;
    return axios.post(url, bodyParams, { headers });
  };

  // GET LOCATE ATMS
  locateAtms(queryParams: IQueryParams = {}) {
    const { page, per_page, zip, radius, lat, lon } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/nodes/atms`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      zip,
      radius,
      lat,
      lon,
    });

    return axios.get(urlWithParams, { headers });
  };

  // GET Verify Address
  // TODO: BETTER TYPING FOR POST PATCH REQUEST BODIES
  // SEE API REQ FILE FOR DETAILS
  verifyAddress(bodyParams: IQueryParams = {}) {
    const { host, headers } = this;
    const url = `${host}/address-verification`;
    return axios.post(url, bodyParams, { headers });
  };

  // GET Verify Routing Number
  // TODO: BETTER TYPING FOR POST PATCH REQUEST BODIES
  // SEE API REQ FILE FOR DETAILS
  verifyRoutingNumber(bodyParams: IQueryParams = {}) {
    const { host, headers } = this;
    const url = `${host}/routing-number-verification`;
    return axios.post(url, bodyParams, { headers });
  };

  // GET CRYPTO QUOTES
  getCryptoQuotes() {
    const { host, headers } = this;
    const url = `${host}/nodes/crypto-quotes`;

    return axios.get(url, { headers });
  };

  // GET CRYPTO MARKET DATA
  getCryptoMarketData(queryParams: IQueryParams = {}) {
    const { limit, currency } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/nodes/crypto-market-watch`;

    const urlWithParams = addQueryParams({ originalUrl, limit, currency });
    return axios.get(urlWithParams, { headers });
  };

  // GET WEBHOOK LOGS
  getWebhookLogs() {
    const { host, headers } = this;
    const url = `${host}/subscriptions/logs`;

    return axios.get(url, { headers });
  };

  // GET TRADE MARKET DATA
  getTradeMarketData(queryParams: IQueryParams = {}) {
    const { ticker } = queryParams;
    const { host, headers } = clientInfo;
    const originalUrl = `${host}/nodes/trade-market-watch`;

    const url = addQueryParams({ originalUrl, ticker });
    return axios.get(url, { headers });
  };
}

export default Client;
