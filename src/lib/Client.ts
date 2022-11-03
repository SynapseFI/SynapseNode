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
import { IDeliverabilityObject, IGetAtmLocationsResponse, IHeadersObject, IHeadersOptions, IQueryParams, IVerifiedRoutingNum } from '../interfaces/helpers';
import axios, { AxiosResponse } from 'axios';
import { addQueryParams } from '../helpers/buildUrls';
import { IGetUsersResponse, IUserObject } from '../interfaces/user';
import User from './User';
import { IGetTransactionsApiResponse } from '../interfaces/transaction';
import { IGetNodesApiResponse } from '../interfaces/node';
import { IGetSubscriptionsApiResponse, ISubscriptionObject } from '../interfaces/subscription';

/**
 * LITERALLY ANYTHING
 */
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

  /**
   * @description POST call to create a new user.
   * @param bodyParams payload with user details for create user call.
   * @param ip_address ip address of the user
   * @param options TODO
   * @returns newly created user object instantiated with SynapseNode library
   *
   * {@link [User Object Details](https://docs.synapsefi.com/api-references/users/user-object-details)}
   * {@link [Create User](https://docs.synapsefi.com/api-references/users/create-user)}
   */
  async createUser(
    bodyParams: Partial<IUserObject>,
    ip_address: string,
    options: IHeadersOptions | null = null
  ): Promise<User> {
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
    const config = makePostPatchConfig(headers);
    const { data } = await axios.post(`${this.host}/users`, bodyParams, config);

    return instantiateUser({ data, headerObj, client: this });
  };

  /**
   * @description gets a list of users based on query passed.
   * @param queryParams parameters for GET call to fetch users
   * @returns list of users based on query passed.
   * 
   * {@link [View All Users](https://docs.synapsefi.com/api-references/users/view-all-users-paginated)}
   */
  getAllUsers(
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<IGetUsersResponse>> {
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

  /**
   * @description fetches and instanties a user object based on the passed user primary key.
   * @param user_id primary key of the desired user to get
   * @param options TODO
   * @returns instantiated user object
   * 
   * {@link [View User](https://docs.synapsefi.com/api-references/users/view-user)}
   */
  async getUser(
    user_id: string,
    options: { [index: string]: string } | null = null
  ): Promise<User> {
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
    const { host } = this;
    const originalUrl = `${host}/users/${user_id}`

    const full_dehydrate = options?.full_dehydrate ? 'yes' : 'no';
    const urlWithParams = addQueryParams({ originalUrl, full_dehydrate });
    const { data } = await axios.get(urlWithParams, { headers });

    return instantiateUser({ data, headerObj, client: this });
  };

  /**
   * @description gest a list of transactions
   * @param queryParams parameters for GET call to fetch list of transactions
   * @returns list of transactions based on query passed
   */
  getPlatformTransactions(
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<IGetTransactionsApiResponse>> {
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

  /**
   * @description gest a list of nodes
   * @param queryParams parameters for GET call to fetch list of nodes
   * @returns list of nodes based on query passed
   */
  getPlatformNodes(
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<IGetNodesApiResponse>> {
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

  /**
   * @returns list of institutions
   */
  getInstitutions(): Promise<AxiosResponse<any>> {
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

  /**
   * 
   * @param subscriptionUrl url destination for webhooks
   * @param scope scopes on which to run the callback
   * @param idempotency_key optional idempotency in headers
   * @returns newly created
   * 
   * {@link [Subscription Object Details](https://docs.synapsefi.com/api-references/subscriptions/create-subscription)}
   * {@link [Create Subscription](https://docs.synapsefi.com/api-references/subscriptions/create-subscription)}
   */
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

  /**
   * @description gets a list of all the subscriptions
   * @param queryParams Query params to view list of subsciptions
   * @returns list of subscriptions
   * 
   * {@link [View All Subscriptions](https://docs.synapsefi.com/api-references/subscriptions/view-all-subscriptions)}
   */
  getAllSubscriptions(
    queryParams: IQueryParams = {},
  ): Promise<AxiosResponse<IGetSubscriptionsApiResponse>> {
    const { page, per_page } = queryParams;
    const { host, headers } = this;
    const originalUrl = `${host}/subscriptions`;

    const urlWithParams = addQueryParams({ originalUrl, page, per_page });

    return axios.get(urlWithParams, { headers });
  };

  /**
   * @description fetch a single subscription by ID
   * @param subscription_id primary key of subscription to fetch
   * @returns subscription object details
   */
  getSubscription(
    subscription_id: string,
  ): Promise<AxiosResponse<ISubscriptionObject>> {
    const { host, headers } = this;
    const url = `${host}/subscriptions/${subscription_id}`;
    return axios.get(url, { headers });
  };

  /**
   * @description patch call to update specified subscription
   * @param subscription_id primary key of subscription to update
   * @param bodyParams subscription properties to update
   * @returns updated scription object
   */
  updateSubscription(
    subscription_id: string,
    bodyParams: Partial<ISubscriptionObject> = {},
  ): Promise<AxiosResponse<ISubscriptionObject>> {
    const { host, headers } = this;
    const url = `${host}/subscriptions/${subscription_id}`;
    return axios.post(url, bodyParams, { headers });
  };

  /**
   * @description view all atms
   * @param queryParams 
   * @returns 
   * 
   * {@link [View ATMs](https://docs.synapsefi.com/api-references/nodes/view-atms)}
   */
  locateAtms(
    queryParams: IQueryParams = {},
  ): Promise<AxiosResponse<IGetAtmLocationsResponse>> {
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

  /**
   * 
   * @param bodyParams 
   * @returns deliverability details object
   */
  verifyAddress(
    bodyParams: any = {}
  ): Promise<AxiosResponse<IDeliverabilityObject>> {
    const { host, headers } = this;
    const url = `${host}/address-verification`;
    return axios.post(url, bodyParams, { headers });
  };

  /**
   * @param bodyParams 
   * @returns information about the verified routing number
   * 
   * {@link [Verify Routing Number](https://docs.synapsefi.com/api-references/miscellaneous/verify-routing-number)}
   */
  verifyRoutingNumber(
    bodyParams: { routing_num?: string; type?: string } = {},
  ): Promise<AxiosResponse<IGetAtmLocationsResponse>> {
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
    const { host, headers } = this;
    const originalUrl = `${host}/nodes/trade-market-watch`;

    const url = addQueryParams({ originalUrl, ticker });
    return axios.get(url, { headers });
  };
}

export default Client;
