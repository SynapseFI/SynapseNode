import { AxiosResponse } from "axios";

export class Client {
  constructor(options: {
    client_id: string;
    client_secret: string;
    fingerprint: string;
    ip_address: string;
    isProduction: boolean;
  });

  // POST CREATE USER
  async createUser(
    bodyParams: any,
    ip_address: string,
    options: {} = null
  ): Promise<User>;

  // GET ALL USERS
  getAllUsers(queryParams?: {
    query: any;
    page: number;
    per_page: number;
    show_refresh_tokens: any;
  }): Promise<AxiosResponse<any>>;

  // GET USER W/ USER_ID
  getUser(user_id: string, options: any = null): Promise<User>;

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET ALL PLATFORM NODES
  getPlatformNodes(
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET INSTITUTIONS
  getInstitutions(): Promise<AxiosResponse<any>>;

  // GET ISSUE PUBLIC KEY
  issuePublicKey(
    scope: string[] = [
      "OAUTH|POST",
      "USERS|POST",
      "USERS|GET",
      "USER|GET",
      "USER|PATCH",
      "SUBSCRIPTIONS|GET",
      "SUBSCRIPTIONS|POST",
      "SUBSCRIPTION|GET",
      "SUBSCRIPTION|PATCH",
      "CLIENT|REPORTS",
      "CLIENT|CONTROLS"
    ]
  ): Promise<AxiosResponse<any>>;

  // POST CREATE SUBSCRIPTION
  createSubscription(
    url: string,
    scope: string[] = [
      "USERS|POST",
      "USER|PATCH",
      "NODES|POST",
      "NODE|PATCH",
      "TRANS|POST",
      "TRAN|PATCH"
    ],
    idempotency_key: string = null
  ): Promise<AxiosResponse<any>>;

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET SUBSCRIPTION W/ SUBSCRIPTION_ID
  getSubscription(subscription_id: string);

  // PATCH UPDATE SUBSCRIPTION
  updateSubscription(
    subscription_id: string,
    bodyParams: any = {}
  ): Promise<AxiosResponse<any>>;

  // GET LOCATE ATMS
  locateAtms(
    queryParams: {
      page: number;
      per_page: number;
      zip: string;
      radius: any;
      lat: any;
      lon: any;
    } = {}
  ): Promise<AxiosResponse<any>>;

  // GET CRYPTO QUOTES
  getCryptoQuotes(): Promise<AxiosResponse<any>>;

  // GET CRYPTO MARKET DATA
  getCryptoMarketData(
    queryParams: { limit: number; currency: string } = {}
  ): Promise<AxiosResponse<any>>;

  // GET WEBHOOK LOGS
  getWebhookLogs(): Promise<AxiosResponse<any>>;

  // GET TRADE MARKET DATA
  getTradeMarketData(
    queryParams: { ticker: any } = {}
  ): Promise<AxiosResponse<any>>;
}
export class User {
  id: string;
  body: any;
  host: any;
  fingerprint: string;
  ip_address: string;
  oauth_key: string;
  client: Client;
  headers: any;

  constructor({
    data: any,
    headerObj: any,
    client
  }: {
    data: any;
    headerObj: any;
    client: Client;
  });

  // PATCH ADD USER KYC
  addUserKyc(bodyParams: any = {}): Promise<AxiosResponse<any>>;

  // PATCH DELETE EXISTING DOCUMENT
  deleteExistingDocument(bodyParams: any = {}): Promise<AxiosResponse<any>>;

  // PATCH UPDATE USER
  updateUser(bodyParams: any = {}): Promise<AxiosResponse<any>>;

  // RETRIEVE REFRESH TOKEN
  _grabRefreshToken(): Promise<string>;

  // POST OAUTH USER
  _oauthUser(bodyParams: any = {}): Promise<any>;

  // POST CREATE NODE
  createNode(
    bodyParams: any = {},
    idempotency_key: string = null
  ): Promise<AxiosResponse<any>>;

  // POST ACH-US MFA
  // submit answer to a mfa question from bank login attempt
  verifyAchMfa(
    access_token: string,
    mfa_answer: string,
    idempotency_key: string = null
  ): Promise<AxiosResponse<any>>;

  // GET ALL USER NODES
  getAllUserNodes(
    queryParams: { page: number; per_page: number; type: string } = {}
  ): Promise<AxiosResponse<any>>;

  // GET NODE W/ NODE_ID
  getNode(
    node_id: string,
    queryParams: { full_dehydrate: "yes" | "no"; force_refresh: any } = {}
  ): Promise<AxiosResponse<any>>;

  // GET ALL USER TRANSACTIONS
  getUserTransactions(
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET TRIGGER DUMMY TRANSACTIONS
  triggerDummyTransactions(
    node_id: string,
    queryParams: {
      amount: number;
      foreign_transaction: "yes" | "no";
      is_credit: "yes" | "no";
      subnet_id: string;
      type: string;
    } = {}
  ): Promise<AxiosResponse<any>>;

  // PATCH GENERATE UBO FORM
  generateUboForm(bodyParams: any): Promise<AxiosResponse<any>>;

  // GET STATEMENTS BY USER
  getStatementsByUser(
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET STATEMENTS BY NODE
  getStatementsByNode(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // PATCH SHIP DEBIT CARD NODE
  shipCardNode(node_id: string, bodyParams: any): Promise<AxiosResponse<any>>;

  // PATCH RESET DEBIT CARD NODE
  resetCardNode(node_id: string): Promise<AxiosResponse<any>>;

  // PATCH VERIFY MICRO-DEPOSITS
  verifyMicroDeposits(
    node_id: string,
    bodyParams: any
  ): Promise<AxiosResponse<any>>;

  // PATCH REINITIATE MICRO-DEPOSITS
  reinitiateMicroDeposits(node_id: string): Promise<AxiosResponse<any>>;

  // PATCH UPDATE NODE
  updateNode(node_id: string, bodyParams: any): Promise<AxiosResponse<any>>;

  // DELETE NODE
  deleteNode(node_id: string): Promise<AxiosResponse<any>>;

  // PATCH GENERATE APPLE PAY TOKEN
  generateApplePayToken(
    node_id: string,
    bodyParams: any
  ): Promise<AxiosResponse<any>>;

  // POST CREATE TRANSACTION
  createTransaction(
    node_id: string,
    bodyParams: any,
    idempotency_key: string = null
  ): Promise<AxiosResponse<any>>;

  // GET TRANSACTION W/ TRANSACTION_ID
  getTransaction(
    node_id: string,
    trans_id: string
  ): Promise<AxiosResponse<any>>;

  // GET ALL NODE TRANSACTIONS
  getAllNodeTransactions(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // DELETE TRANSACTION
  deleteTransaction(
    node_id: string,
    trans_id: string
  ): Promise<AxiosResponse<any>>;

  // PATCH COMMENT ON STATUS
  commentOnStatus(
    node_id: string,
    trans_id: string,
    bodyParams: any
  ): Promise<AxiosResponse<any>>;

  // PATCH DISPUTE CARD TRANSACTION
  disputeCardTransaction(
    node_id: string,
    trans_id: string,
    bodyParams: any
  ): Promise<AxiosResponse<any>>;

  // GET ALL SUBNETS
  getAllSubnets(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  ): Promise<AxiosResponse<any>>;

  // GET SUBNET W/ SUBNET_ID
  getSubnet(node_id: string, subnet_id: string): Promise<AxiosResponse<any>>;

  // POST CREATE SUBNET
  createSubnet(
    node_id: string,
    bodyParams: any,
    idempotency_key: string = null
  ): Promise<AxiosResponse<any>>;

  // PATCH UPDATE SUBNET
  updateSubnet(
    node_id: string,
    subnet_id: string,
    bodyParams: any = {}
  ): Promise<AxiosResponse<any>>;

  // PATCH SHIP CARD SUBNET
  shipCard(
    node_id: string,
    subnet_id: string,
    bodyParams: any = {}
  ): Promise<AxiosResponse<any>>;

  // POST First call for registering new fingerprint
  registerNewFingerprint(fp: string): Promise<AxiosResponse<any>>;

  // POST Second call for registering new fingerprint
  supplyDevice2FA(fp: string, device: string): Promise<AxiosResponse<any>>;

  // POST Final call for registering new fingerprint
  verifyFingerprint2FA(
    fp: string,
    validation_pin: string
  ): Promise<AxiosResponse<any>>;

  // UPDATE USER IP ADDRESS
  updateIpAddress(ip: string): any;
}
