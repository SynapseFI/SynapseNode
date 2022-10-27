import { IHeadersObject, IHeadersValues, IQueryParams } from "../interfaces/helpers";
import axios from 'axios';

import {
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
} from '../constants/apiReqNames';

import Client from './Client';
import apiRequests from '../apiReqs/apiRequests';
import buildHeaders, { makePostPatchConfig } from '../helpers/buildHeaders';
import { addQueryParams } from "../helpers/buildUrls";

class User {
  id: string;
  body: any;
  host: string;
  fingerprint: string;
  ip_address: string;
  oauth_key: string;
  client: Client;
  headers: IHeadersObject;

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
    const { host, headers, id } = this;
    const url = `${host}/users/${id}`;
    return axios.patch(url, bodyParams, { headers });
  }

  // PATCH DELETE EXISTING DOCUMENT
  deleteExistingDocument(bodyParams = {}) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}`;
    return axios.patch(url, bodyParams, { headers });
  }

  // PATCH UPDATE USER
  updateUser(bodyParams = {}) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}`;
    const config = makePostPatchConfig(headers);

    return axios.patch(url, bodyParams, config);
  }
  
  /**
   * GET ALL USER DUPLICATES 
   * 
   * @returns Promise
   * 
   * [Get User Duplicates Docs]{@link https://docs.synapsefi.com/api-references/users/manage-duplicates#example-request}
   */
  getUserDuplicates() {
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/get-duplicates`;
    const urlWithParams = addQueryParams({
      originalUrl,
      full_dehydrate: 'yes',
      force_refresh: 'yes',
    })
    return axios.get(urlWithParams, { headers });
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
    const { host, headers, id } = this;
    const bodyParams = { swap_to_user_id };
    const url = `${host}/users/${id}/swap-duplicate-users`;

    return axios.patch(url, bodyParams, { headers })
  }

  // RETRIEVE REFRESH TOKEN
  _grabRefreshToken() {
    const { host, id, headers } = this;
    const url = `${host}/users/${id}?full_dehydrate=no`
    return axios
      .get(url, { headers })
      .then(({ data }) => {
        return data.refresh_token;
      })
  }

  // POST OAUTH USER
  _oauthUser(bodyParams = {}) {
    const { host, id, headers } = this;
    const url = `${host}/oauth/${id}`;
    return axios
      .post(url, bodyParams, { headers })
      .then(({ data }) => {
        this.oauth_key = data.oauth_key;

        const updatedHeaders = buildHeaders({
          client_id: this.client.client_id,
          client_secret: this.client.client_secret,
          fingerprint: this.fingerprint,
          ip_address: this.ip_address,
          oauth_key: this.oauth_key,
        })

        this.headers = updatedHeaders;
        return data;
      })
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

    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes`;
    return axios.post(url, bodyParams, { headers });
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

    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes`;
    return axios.post(url, { access_token, mfa_answer }, { headers });
  }

  // GET ALL USER NODES
  getAllUserNodes(queryParams: IQueryParams = {}) {
    const { page, per_page, type } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes`;
    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      type,
    });

    return axios.get(urlWithParams, { headers });
  }

  // GET NODE W/ NODE_ID
  getNode(node_id, queryParams: IQueryParams = {}) {
    const { full_dehydrate, force_refresh } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}`;

    const urlWithParams = addQueryParams({
      originalUrl,
      full_dehydrate: full_dehydrate ? 'yes' : 'no',
      force_refresh: force_refresh ? 'yes' : 'no',
    });

    return axios.get(urlWithParams, { headers });
  }

  // GET ALL USER TRANSACTIONS
  getUserTransactions(queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/trans`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      filter,
    })

    return axios.get(urlWithParams, { headers });
  }

  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(node_id, queryParams: IQueryParams = {}) {
    const {
      amount,
      foreign_transaction,
      is_credit,
      subnet_id,
      type
    } = queryParams;

    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}/dummy-tran`;

    const urlWithParams = addQueryParams({
      originalUrl,
      amount,
      foreign_transaction,
      is_credit,
      subnet_id,
      type,
    });

    return axios.get(urlWithParams, { headers });
  }

  // PATCH GENERATE UBO FORM
  generateUboForm(bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/ubo`;
    return axios.patch(url, bodyParams, { headers });
  }

  // GET STATEMENTS BY USER
  getStatementsByUser(queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/statements`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
    })

    return axios.get(urlWithParams, { headers });
  }

  // GET STATEMENTS BY NODE
  getStatementsByNode(node_id, queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}/statements`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
    });

    return axios.get(urlWithParams, { headers });
  }

  // PATCH SHIP DEBIT CARD NODE
  shipCardNode(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?ship=yes`;
    return axios.patch(url, bodyParams, { headers });
  }

  // PATCH RESET DEBIT CARD NODE
  resetCardNode(node_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?reset=yes`;

    return axios.patch(url, {}, { headers });
  }

  // PATCH VERIFY MICRO-DEPOSITS
  verifyMicroDeposits(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  // PATCH REINITIATE MICRO-DEPOSITS
  reinitiateMicroDeposits(node_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?resend_micro=yes`;

    return axios.patch(url, {}, { headers });
  }

  // PATCH UPDATE NODE
  updateNode(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  // DELETE NODE
  deleteNode(node_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.delete(url, { headers });
  }

  // PATCH GENERATE APPLE PAY TOKEN
  generateApplePayToken(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/applepay`;

    return axios.patch(url, bodyParams, { headers });
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

    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans`;

    return axios.post(url, bodyParams, { headers });
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
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/batch-trans`;

    return axios.post(url, bodyParams, { headers });
  }

  // GET TRANSACTION W/ TRANSACTION_ID
  getTransaction(node_id, trans_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.get(url, { headers });
  }

  // GET ALL NODE TRANSACTIONS
  getAllNodeTransactions(node_id, queryParams: IQueryParams = {}) {
    const { page, per_page, filter } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}/trans`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
      filter,
    });

    return axios.get(urlWithParams, { headers });
  }

  // DELETE TRANSACTION
  deleteTransaction(node_id, trans_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.delete(url, { headers });
  }

  // PATCH COMMENT ON STATUS
  commentOnStatus(node_id, trans_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  // PATCH DISPUTE CARD TRANSACTION
  disputeCardTransaction(node_id, trans_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}/dispute`;
    const config = makePostPatchConfig(headers);
    return axios.patch(url, bodyParams, config);
  }

  // GET ALL SUBNETS
  getAllSubnets(node_id, queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}/subnets`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page
    });

    return axios.get(urlWithParams, { headers });
  }

  // GET SUBNET W/ SUBNET_ID
  getSubnet(node_id, subnet_id, queryParams: IQueryParams = {}) {
    const { full_dehydrate } = queryParams;
    const { host, headers, id } = this;
    let originalUrl = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;

    const urlWithParams = addQueryParams({
      originalUrl,
      full_dehydrate: full_dehydrate ? 'yes' : 'no',
    });

    return axios.get(urlWithParams, { headers });
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

    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets`;

    return axios.post(url, bodyParams, { headers });
  }

  // PATCH UPDATE SUBNET
  updateSubnet(node_id, subnet_id, bodyParams = {}) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  // POST PUSH CARD SUBNET
  pushToMobileWallet(node_id, subnet_id, bodyParams={}) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/push`;

    return axios.post(url, bodyParams, { headers });
  }

  // PATCH SHIP CARD SUBNET
  shipCard(node_id, subnet_id, bodyParams ={}) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship`;

    return axios.patch(url, bodyParams, { headers });
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
  getAllCardShipments(node_id, subnet_id, queryParams: IQueryParams = {}) {
    const { page, per_page } = queryParams;
    const { host, headers, id } = this;
    const originalUrl = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship`;

    const urlWithParams = addQueryParams({
      originalUrl,
      page,
      per_page,
    })

    return axios.get(urlWithParams, { headers });
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
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship/${shipment_id}`;
    return axios.get(url, { headers });
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
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship/${shipment_id}`;
    return axios.delete(url, { headers });
  }

  // POST First call for registering new fingerprint
  async registerNewFingerprint(fp: string) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    const { host, headers, id } = this;
    const url = `${host}/oauth/${id}`;
    return axios.post(url, { refresh_token }, { headers });
  }

  // POST Second call for registering new fingerprint
  async supplyDevice2FA(fp: string, device: string) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    const { host, headers, id } = this;
    const url = `${host}/oauth/${id}`;
    return axios.post(
      url,
      { refresh_token, phone_number: device },
      { headers }
    );
  }

  // POST Final call for registering new fingerprint
  async verifyFingerprint2FA(fp: string, validation_pin: string) {
    const refresh_token = await this._grabRefreshToken();

    this.fingerprint = fp;
    this.headers = buildHeaders({
      client_id: this.client.client_id,
      client_secret: this.client.client_secret,
      fingerprint: this.fingerprint,
      ip_address: this.ip_address,
      oauth_key: this.oauth_key
    });

    const { host, headers, id } = this;
    const url = `${host}/oauth/${id}`;
    return axios.post(
      url,
      { refresh_token, validation_pin },
      { headers }
    );
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

export default User;
