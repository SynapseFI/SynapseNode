import { IHeadersObject, IQueryParams } from "../interfaces/helpers";
import axios, { AxiosResponse } from 'axios';
import Client from './Client';
import buildHeaders, { makePostPatchConfig } from '../helpers/buildHeaders';
import { addQueryParams } from "../helpers/buildUrls";
import { IUserObject } from "../interfaces/user";
import { IgenECashBarcodePayload, IGetNodesApiResponse, INodeDetailsObject } from "../interfaces/node";
import { IDisputeTransactionPayload, IGetTransactionsApiResponse, ITransactionDetailsObject } from "../interfaces/transaction";
import { IGetShipmentsApiResponse, IGetSubnetsApiResponse, IShipmentObject, ISubnetDetailsObject } from "../interfaces/subnet";

class User {
  id: string;
  body: IUserObject;
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

  /**
   * @description patch call to add KYC info for users
   * @param bodyParams user object details to be updated
   * @returns updated user object
   * 
   * {@link [KYC FAQs](https://docs.synapsefi.com/api-references/users#kyc-faqs)}
   */
  addUserKyc(
    bodyParams: Partial<IUserObject> = {}
  ): Promise<AxiosResponse<IUserObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}`;
    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description delete a base document by ID
   * @param bodyParams specify which document id to delete, include `permission_scope` as `"DELETE_DOCUMENT"`
   * @returns updated user object
   * 
   * @todo refactor to take in a document id and abstract building the necessary body params
   * 
   * {@link [Delete an existing document](https://docs.synapsefi.com/api-references/users/update-user#delete-an-existing-base-document)}
   */
  deleteExistingDocument(
    bodyParams: Partial<IUserObject> = {}
  ): Promise<AxiosResponse<IUserObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}`;
    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description update a user object
   * @param bodyParams user object properties to update
   * @returns update user object details
   * 
   * {@link [Update User](https://docs.synapsefi.com/api-references/users/update-user)}
   */
  updateUser(
    bodyParams: Partial<IUserObject> = {}
  ): Promise<AxiosResponse<IUserObject>> {
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

  /**
   * RETRIEVE REFRESH TOKEN
   */
  _grabRefreshToken() {
    const { host, id, headers } = this;
    const url = `${host}/users/${id}?full_dehydrate=no`
    return axios
      .get(url, { headers })
      .then(({ data }) => {
        return data.refresh_token;
      })
  }

  /**
   * POST OAUTH USER
   */
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

  /**
   * @description creates a node for the user.
   * @param bodyParams type is required, info and extra values are optional depending on type.
   * @param idempotency_key optional idempotency key for headers
   * @returns newly created node object
   * 
   * {@link [Create Node](https://docs.synapsefi.com/api-references/nodes/create-node)}
   */
  createNode(
    bodyParams = {},
    idempotency_key: string | null = null
  ): Promise<AxiosResponse<INodeDetailsObject>> {
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

  /**
   * @description gets all user nodes
   * @param queryParams parameters and filter for searching for user nodes
   * @returns list of user's nodes
   * 
   * {@link [View All User Nodes](https://docs.synapsefi.com/api-references/nodes/view-all-user-nodes)}
   */
  getAllUserNodes(
    queryParams: IQueryParams = {},
  ): Promise<AxiosResponse<IGetNodesApiResponse>> {
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

  /**
   * @description fetch node details by suplied node ID
   * @param node_id primary key for node
   * @param queryParams query parameters
   * @returns node details object
   * 
   * {@link [View Node](https://docs.synapsefi.com/api-references/nodes/view-node)}
   */
  getNode(
    node_id: string,
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<INodeDetailsObject>> {
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

  /**
   * @description returns a list of user transactions
   * @param queryParams filters and parameters for trans to fetch
   * @returns list of trans
   * 
   * {@link [View all user transactions](https://docs.synapsefi.com/api-references/transactions/view-all-user-transactions)}
   */
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

  /**
   * 
   * GET TRIGGER DUMMY TRANSACTIONS
   */
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

  /**
   * @description UBO or Ultimate Beneficial Owner documents is used to declare who is the ultimate beneficial owner of a business or major shareholder.
   * @param bodyParams see Generate UBO Doc for details
   * @returns TODO
   * 
   * {@link [Generate UBO Doc](https://docs.synapsefi.com/api-references/users/generate-ubo-doc)}
   */
  generateUboForm(
    bodyParams: any
  ): Promise<AxiosResponse<any>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/ubo`;
    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description gets list of statement objects based on supplied user id
   * @param queryParams 
   * @returns list of user statement objects
   * 
   * {@link [Statement Object Details](https://docs.synapsefi.com/api-references/statements/statement-object-details)}
   * {@link [View all user statements](https://docs.synapsefi.com/api-references/statements/view-all-user-statements)}
   */
  getStatementsByUser(
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<any>> {
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

  /**
   * @description gets list of statement objects base on passed node id
   * @param queryParams 
   * @returns list of node statement objects
   * 
   * {@link [Statement Object Details](https://docs.synapsefi.com/api-references/statements/statement-object-details)}
   * {@link [View all node statements](https://docs.synapsefi.com/api-references/statements/view-all-node-statements)}
   */
  getStatementsByNode(
    node_id: string,
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<any>> {
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

  /**
   * @deprecated use `shipCard` instead
   */
  shipCardNode(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?ship=yes`;
    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @deprecated
   */
  resetCardNode(node_id) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?reset=yes`;

    return axios.patch(url, {}, { headers });
  }

  /**
   * @description micro deposits used to verify ACH node
   * @param node_id primary key of node
   * @param bodyParams micro deposits
   * @returns updated node object
   * 
   * @todo refactor to take in the two micro deposit values and shape the payload in this method
   * {@link [Verify Micro Deposits](https://docs.synapsefi.com/api-references/nodes/update-node#verify-micro-deposits)}
   */
  verifyMicroDeposits(
    node_id: string,
    bodyParams: { micro: [number, number] },
  ): Promise<AxiosResponse<INodeDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description resends the micro deposits
   * @param node_id primary key of node
   * 
   * {@link [Resend Micro Deposits](https://docs.synapsefi.com/api-references/nodes/update-node#resend-micro-deposits)}
   */
  reinitiateMicroDeposits(
    node_id: string,
  ): Promise<AxiosResponse<any>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}?resend_micro=yes`;

    return axios.patch(url, {}, { headers });
  }

  /**
   * @description `PATCH` call to update node
   * @param node_id primary key of node
   * @param bodyParams node object properties to update
   * @returns updated node object
   */
  updateNode(
    node_id: string,
    bodyParams: Partial<INodeDetailsObject>,
  ): Promise<AxiosResponse<INodeDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description sets `is_active` to false
   * @param node_id primary key of node
   * @returns inactive node object
   */
  deleteNode(
    node_id: string,
  ): Promise<AxiosResponse<INodeDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}`;

    return axios.delete(url, { headers });
  }

  /**
   * @deprecated use `pushToMobileWallet` instead
   * {@link [Push to Wallet](https://docs.synapsefi.com/api-references/subnets/push-to-wallet)}
   */
  generateApplePayToken(node_id, bodyParams) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/applepay`;

    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @param node_id primary key of node
   * @param bodyParams payload includes object with amount and currency, as well as retailer id
   * {@link [generate e-cash barcode](https://docs.synapsefi.com/api-references/nodes/generate-ecash-barcode)}
   */
  generateECashBarcode(node_id: string, bodyParams: IgenECashBarcodePayload) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/barcode`;

    return axios.post(url, bodyParams, { headers });
  }

  /**
   * @description `POST` call to create a transaction for a specified node
   * @param node_id primary key of node
   * @param bodyParams details for transaction to create
   * @param idempotency_key optional idempotency key
   * @returns newly created transaction object
   * 
   * {@link [Create Transaction](https://docs.synapsefi.com/api-references/transactions/create-transaction)}
   */
  createTransaction(
    node_id: string,
    bodyParams: Partial<ITransactionDetailsObject>,
    idempotency_key = null
  ): Promise<AxiosResponse<ITransactionDetailsObject>> {
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
  createBatchTransactions(
    node_id: string,
    bodyParams: Partial<ITransactionDetailsObject>[],
  ): Promise<AxiosResponse<IGetTransactionsApiResponse>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/batch-trans`;

    return axios.post(url, bodyParams, { headers });
  }

  /**
   * @description `GET` call for a single transaction
   * @param node_id Primary key of node 
   * @param trans_id Primary key of transaction
   * @returns Single Transaction object
   * 
   * {@link [View Transaction](https://docs.synapsefi.com/api-references/transactions/view-transaction)}
   */
  getTransaction(
    node_id: string,
    trans_id: string,
  ): Promise<AxiosResponse<ITransactionDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.get(url, { headers });
  }

  /**
   * @param node_id primary key of node
   * @param queryParams filter & query parameters for get transactions call
   * @returns list of transactions for a specified node
   * 
   * {@link [View All Node transactions](https://docs.synapsefi.com/api-references/transactions/view-all-node-transactions)}
   */
  getAllNodeTransactions(
    node_id: string,
    queryParams: IQueryParams = {},
  ): Promise<AxiosResponse<IGetTransactionsApiResponse>> {
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

  /**
   * @description To cancel a transaction en route to the recipient, the transaction must not have been batched already. For example, to cancel transactions between native Synapse accounts (ex: Deposit Accounts), they need to have status CREATED or QUEUED-BY-SYNAPSE.While a transaction leaving a Deposit Account, to an ACH-US account can be canceled with status CREATED, QUEUED-BY-SYNAPSE orPROCESSING-DEBIT (because outgoing ACH is batched during PROCESSING-CREDIT).
   * You cannot cancel an already settled transaction, with the exception of Reversals for Interchange Pull transactions. 

   * @param node_id primary key of the node
   * @param trans_id primary key of the transaction
   * @returns canceled transaction
   * 
   * {@link [Cancel Transaction](https://docs.synapsefi.com/api-references/transactions/cancel-transaction)}
   */
  deleteTransaction(
    node_id: string,
    trans_id: string,
  ): Promise<AxiosResponse<ITransactionDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.delete(url, { headers });
  }

  /**
   * @description `PATCH` call to comment on the status of a transaction
   * @param node_id primary key of node
   * @param trans_id primary key of transaction
   * @param bodyParams transaction details to update
   * @returns updated transaction object
   * 
   * @todo refactor to take string comment sintead and format payload here. Also, create sister methods for retry and execute trans
   */
  commentOnStatus(
    node_id: string,
    trans_id: string,
    bodyParams: Partial<ITransactionDetailsObject>,
  ): Promise<AxiosResponse<ITransactionDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description `PATCH` call to dispute a card related transaction
   * @param node_id primary key of node
   * @param trans_id primary key of transaction
   * @param bodyParams dispute transaction payload, see docs for details
   * 
   * @todo response typing
   * 
   * {@link [Dispute Transaction](https://docs.synapsefi.com/api-references/transactions/dispute-transaction)}
   */
  disputeCardTransaction(
    node_id: string,
    trans_id: string,
    bodyParams: IDisputeTransactionPayload,
  ): Promise<AxiosResponse<any>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/trans/${trans_id}/dispute`;
    const config = makePostPatchConfig(headers);
    return axios.patch(url, bodyParams, config);
  }

  /**
   * @description `GET` call to fetch subnets for specified node id
   * @param node_id primary key of node
   * @param queryParams query params & filter for fetching subnets
   * @returns list of subnets
   * 
   * {@link [View All Node Subnets](https://docs.synapsefi.com/api-references/subnets/view-all-node-subnets)}
   */
  getAllSubnets(
    node_id,
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<IGetSubnetsApiResponse>> {
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

  /**
   * @description `GET` call to view a single subnet
   * @param node_id primary key of node
   * @param subnet_id primary key of subnet
   * @param queryParams query params for fetching subnet, for full dehydrate or not
   * @returns sing subnet details
   * 
   * {@link [View Subnet](https://docs.synapsefi.com/api-references/subnets/view-subnet)}
   */
  getSubnet(
    node_id: string,
    subnet_id: string,
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<ISubnetDetailsObject>> {
    const { full_dehydrate } = queryParams;
    const { host, headers, id } = this;
    let originalUrl = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;

    const urlWithParams = addQueryParams({
      originalUrl,
      full_dehydrate: full_dehydrate ? 'yes' : 'no',
    });

    return axios.get(urlWithParams, { headers });
  }

  /**
   * @description `POST` call to create a subnet for a specified node
   * @param node_id primary key of node
   * @param bodyParams 
   * @param idempotency_key optional idempotency key
   * @returns newly created subnet
   */
  createSubnet(
    node_id: string,
    bodyParams: { nickname?: string; account_class?: string; bin?: string },
    idempotency_key: string | null = null
  ): Promise<AxiosResponse<ISubnetDetailsObject>> {
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

  /**
   * @description `PATCH` call to update subnet details
   * @param node_id primary key of node
   * @param subnet_id primary key of subnet
   * @param bodyParams Subnet object properties to update
   * @returns updated subnet object
   * 
   * {@link [Update Subnet](https://docs.synapsefi.com/api-references/subnets/update-subnet)}
   */
  updateSubnet(
    node_id: string,
    subnet_id: string,
    bodyParams: Partial<ISubnetDetailsObject> = {}
  ): Promise<AxiosResponse<ISubnetDetailsObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}`;

    return axios.patch(url, bodyParams, { headers });
  }

  /**
   * @description `PATCH` call to update subnet details
   * @param node_id primary key of node
   * @param subnet_id primary key of subnet
   * @param bodyParams Subnet object properties to update
   * 
   * @todo typing
   * 
   * {@link [Push to Wallet](https://docs.synapsefi.com/api-references/subnets/push-to-wallet)}
   */
  pushToMobileWallet(
    node_id: string,
    subnet_id: string,
    bodyParams: any = {},
  ) {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/push`;

    return axios.post(url, bodyParams, { headers });
  }

  /**
   * @description `POST` call to create a card shipment
   * @param node_id Primary Key of node
   * @param subnet_id primary key of subnet
   * @param bodyParams 
   * @returns newly created subnet
   * 
   * {@link [Create Shipment](https://docs.synapsefi.com/api-references/shipments/create-shipment)}
   */
  shipCard(
    node_id: string,
    subnet_id: string,
    bodyParams: Partial<IShipmentObject> = {}
  ): Promise<AxiosResponse<IShipmentObject>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship`;

    return axios.post(url, bodyParams, { headers });
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
  getAllCardShipments(
    node_id: string,
    subnet_id: string,
    queryParams: IQueryParams = {}
  ): Promise<AxiosResponse<IGetShipmentsApiResponse>> {
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
  getCardShipment(
    node_id: string,
    subnet_id: string,
    shipment_id: string,
  ): Promise<AxiosResponse<IShipmentObject>> {
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
   * 
   * @todo response typing
   */
  deleteCardShipment(
    node_id: string,
    subnet_id: string,
    shipment_id: string,
  ): Promise<AxiosResponse<any>> {
    const { host, headers, id } = this;
    const url = `${host}/users/${id}/nodes/${node_id}/subnets/${subnet_id}/ship/${shipment_id}`;
    return axios.delete(url, { headers });
  }

  /**
   * @description triggers new fingerprint registration flow. If you use this call with a registered and active fingerprint, then this will authenticate the user if the refresh token has not expired.
   * @param fp device fingerprint sring
   * 
   * {@link [OAuth docs](https://docs.synapsefi.com/api-references/oauth)}
   * @todo reponse typing
   */
  async registerNewFingerprint(
    fp: string
  ): Promise<AxiosResponse<any>> {
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

  /**
   * @description part of MFA register new fingerprint flow, tells Synapse where to send MFA pin to
   * @param fp device fingerprint string
   * @param device phone number or email string for 2FA flow
   * 
   * {@link [OAuth docs](https://docs.synapsefi.com/api-references/oauth)}
   * @todo reponse typing
   */
  async supplyDevice2FA(
    fp: string,
    device: string
  ): Promise<AxiosResponse<any>> {
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

  /**
   * @description part of fingerprint registration MFA flow - used to verify validation pin sent
   * @param fp device fingerprint string
   * @param validation_pin validation pin string sent via text or email to 2FA device
   * 
   * {@link [OAuth docs](https://docs.synapsefi.com/api-references/oauth)}
   * @todo reponse typing
   */

  async verifyFingerprint2FA(
    fp: string,
    validation_pin: string
  ): Promise<AxiosResponse<any>> {
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

  /**
   * @description updates the IP address in the instatiated users headers property
   * @param ip 
   * @returns updated headers object on instantiated user object
   */
  updateIpAddress(ip: string): IHeadersObject {
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
