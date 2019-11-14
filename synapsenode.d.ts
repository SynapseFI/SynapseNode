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
  });

  // GET USER W/ USER_ID
  async getUser(user_id: string, options: any = null);

  // GET ALL PLATFORM TRANSACTIONS
  getPlatformTransactions(queryParams: { page: number; per_page: number } = {});

  // GET ALL PLATFORM NODES
  getPlatformNodes(queryParams: { page: number; per_page: number } = {});

  // GET INSTITUTIONS
  getInstitutions();

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
  );

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
  );

  // GET ALL SUBSCRIPTIONS
  getAllSubscriptions(queryParams: { page: number; per_page: number } = {});

  // GET SUBSCRIPTION W/ SUBSCRIPTION_ID
  getSubscription(subscription_id: string);

  // PATCH UPDATE SUBSCRIPTION
  updateSubscription(subscription_id: string, bodyParams: any = {});

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
  );

  // GET CRYPTO QUOTES
  getCryptoQuotes();

  // GET CRYPTO MARKET DATA
  getCryptoMarketData(queryParams: { limit: number; currency: string } = {});

  // GET WEBHOOK LOGS
  getWebhookLogs();

  // GET TRADE MARKET DATA
  getTradeMarketData(queryParams: { ticker: any } = {});
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
  addUserKyc(bodyParams: any = {});

  // PATCH DELETE EXISTING DOCUMENT
  deleteExistingDocument(bodyParams: any = {});

  // PATCH UPDATE USER
  updateUser(bodyParams: any = {});

  // RETRIEVE REFRESH TOKEN
  _grabRefreshToken();

  // POST OAUTH USER
  _oauthUser(bodyParams: any = {});

  // POST CREATE NODE
  createNode(bodyParams: any = {}, idempotency_key: string = null);

  // POST ACH-US MFA
  // submit answer to a mfa question from bank login attempt
  verifyAchMfa(
    access_token: string,
    mfa_answer: string,
    idempotency_key: string = null
  );

  // GET ALL USER NODES
  getAllUserNodes(
    queryParams: { page: number; per_page: number; type: string } = {}
  );

  // GET NODE W/ NODE_ID
  getNode(
    node_id: string,
    queryParams: { full_dehydrate: "yes" | "no"; force_refresh: any } = {}
  );

  // GET ALL USER TRANSACTIONS
  getUserTransactions(queryParams: { page: number; per_page: number } = {});

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
  ) {
    const {
      amount,
      foreign_transaction,
      is_credit,
      subnet_id,
      type
    } = queryParams;

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
  generateUboForm(bodyParams: any);

  // GET STATEMENTS BY USER
  getStatementsByUser(queryParams: { page: number; per_page: number } = {});

  // GET STATEMENTS BY NODE
  getStatementsByNode(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  );

  // PATCH SHIP DEBIT CARD NODE
  shipCardNode(node_id: string, bodyParams: any);

  // PATCH RESET DEBIT CARD NODE
  resetCardNode(node_id: string);

  // PATCH VERIFY MICRO-DEPOSITS
  verifyMicroDeposits(node_id: string, bodyParams: any);

  // PATCH REINITIATE MICRO-DEPOSITS
  reinitiateMicroDeposits(node_id: string);

  // PATCH UPDATE NODE
  updateNode(node_id: string, bodyParams: any);

  // DELETE NODE
  deleteNode(node_id: string);

  // PATCH GENERATE APPLE PAY TOKEN
  generateApplePayToken(node_id: string, bodyParams: any);

  // POST CREATE TRANSACTION
  createTransaction(
    node_id: string,
    bodyParams: any,
    idempotency_key: string = null
  );

  // GET TRANSACTION W/ TRANSACTION_ID
  getTransaction(node_id: string, trans_id: string);

  // GET ALL NODE TRANSACTIONS
  getAllNodeTransactions(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  );

  // DELETE TRANSACTION
  deleteTransaction(node_id: string, trans_id: string);

  // PATCH COMMENT ON STATUS
  commentOnStatus(node_id: string, trans_id: string, bodyParams: any);

  // PATCH DISPUTE CARD TRANSACTION
  disputeCardTransaction(node_id: string, trans_id: string, bodyParams: any);

  // GET ALL SUBNETS
  getAllSubnets(
    node_id: string,
    queryParams: { page: number; per_page: number } = {}
  );

  // GET SUBNET W/ SUBNET_ID
  getSubnet(node_id: string, subnet_id: string);

  // POST CREATE SUBNET
  createSubnet(
    node_id: string,
    bodyParams: any,
    idempotency_key: string = null
  );

  // PATCH UPDATE SUBNET
  updateSubnet(node_id: string, subnet_id: string, bodyParams: any = {});

  // PATCH SHIP CARD SUBNET
  shipCard(node_id: string, subnet_id: string, bodyParams: any = {});

  // POST First call for registering new fingerprint
  async registerNewFingerprint(fp: string);

  // POST Second call for registering new fingerprint
  async supplyDevice2FA(fp: string, device: string);

  // POST Final call for registering new fingerprint
  async verifyFingerprint2FA(fp: string, validation_pin: string);

  // UPDATE USER IP ADDRESS
  updateIpAddress(ip: string);
}
