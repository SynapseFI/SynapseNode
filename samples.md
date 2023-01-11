# Table of Contents
- [Initialization](#initialization)
- [Client](#client)
  * [Create User](#create-user)
  * [Get All Users](#get-all-users)
  * [Get User](#get-user)
  * [Get All Platform Transactions](#get-all-platform-transactions)
  * [Get All Platform Nodes](#get-all-platform-nodes)
  * [Get Institutions](#get-institutions)
  * [Issue Public Key](#issue-public-key)
  * [Create Subscription](#create-subscription)
  * [Get All Subscriptions](#get-all-subscriptions)
  * [Get Subscription](#get-subscription)
  * [Update Subscription](#update-subscription)
  * [Locate ATMs](#locate-atms)
  * [Verify Address ATMs](#verify-address)
  * [Verify Routing Number](#verify-routing-number)
  * [Get Crypto Quotes](#crypto-quotes)
  * [Get Crypto Market Data](#crypto-market-data)
  * [Get Webhook Logs](#webhook-logs)
  * [Get Trade Market Data](#trade-market-data)
  * [Dispute Chargeback](#dispute-chargeback)
  * [Get Node Types](#get-node-types)
  * [Get User Document Types](#get-user-document-types)
  * [Get User Entity Types](#get-user-entity-types)
  * [Get User Entity Scopes](#get-user-entity-scopes)
- [User](#user)
  * [Add User KYC](#add-user-kyc)
  * [Delete Existing Document](#delete-existing-document)
  * [Update User](#update-user)
  * [Get User Duplicates](#get-user-duplicates)
  * [Swap Duplicate User](#swap-duplicate-user)
  * [Create Node](#create-node)
  * [Verify ACH-US MFA](#verify-ach-us-mfa)
  * [Get All User Nodes](#get-all-user-nodes)
  * [Get Node](#get-node)
  * [Get User Transactions](#get-user-transactions)
  * [Trigger Dummy Transactions](#trigger-dummy-transactions)
  * [Generate UBO Form](#generate-ubo-form)
  * [Get Statements by User](#get-statements-by-user)
  * [Get Statements by Node](#get-statements-by-node)
  * [Ship Debit Card](#ship-debit-card)
  * [Reset Debit Card](#reset-debit-card)
  * [Verify Micro-Deposits](#verify-micro-deposits)
  * [Reinitiate Micro-Deposits](#reinitiate-micro-deposits)
  * [Update Node](#update-node)
  * [Delete Node](#delete-node)
  * [Generate Apple Pay Token](#generate-apple-pay-token)
  * [Generate E Cash Barcode](#generate-e-cash-barcode)
  * [Create Transaction](#create-transaction)
  * [Create Batch Transaction](#create-batch-transaction)
  * [Get Transaction](#get-transaction)
  * [Get All Node Transactions](#get-all-node-transactions)
  * [Delete Transaction](#delete-transaction)
  * [Comment on Status](#comment-on-status)
  * [Dispute Card Transaction](#dispute-card-transaction)
  * [Get All Subnets](#get-all-subnets)
  * [Get Subnet](#get-subnet)
  * [Create Subnet](#create-subnet)
  * [Update Subnet](#update-subnet)
  * [Push to Mobile Wallet](#push-to-mobile-wallet)
  * [Ship Card Subnet](#ship-card-subnet)
  * [Get All Card Subnet Shipments](#get-all-card-subnet-shipments)
  * [Get Card Subnet Shipment](#get-card-subnet-shipment)
  * [Delete Card Subnet Shipment](#delete-card-subnet-shipment)
  * [Register New Fingerprint](#register-new-fingerprint)
  * [Supply Device 2FA](#supply-device-2fa)
  * [Verify Fingerprint 2FA](#verify-fingerprint-2fa)
  * [Update IP Address](#update-ip-address)
- [Idempotent Requests](#idempotent-requests)

## Initialization
```javascript
const Synapse = require('synapsenode');
const Client = Synapse.Client;
```

## Instantiate new Client:
```javascript
const client = new Client({
  client_id: '<client_id>',
  client_secret: '<client_secret>',
  fingerprint: '<fingerprint>',
  ip_address: '<ip_address>',
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
});
```

## Client
#### Verify Address
To verify an address - supply the payload
```javascript
client.verifyAddress({
    "address_street": "101 2nd st ste 1500",
    "address_city": "san francisco",
    "address_subdivision": "CA",
    "address_country_code": "US",
    "address_postal_code": "94105"
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Verify Routing Number
To verify a routing number - supply the payload
```javascript
client.verifyRoutingNumber({
    "routing_num": "084008426",
    "type": "ACH-US"
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Create User
```javascript
client.createUser({
    logins: [
      {
        email: 'test@synapsefi.com'
      }
    ],
    phone_numbers: [
      '901.111.1111',
      'test@synapsefi.com'
    ],
    legal_names: [
      'Test User'
    ],
    documents: [
      {
        email: 'test@test.com',
        phone_number: '901.111.1111',
        ip: '::1',
        name: 'Test User',
        alias: 'Test',
        entity_type: 'M',
        entity_scope: 'Arts & Entertainment',
        day: 2,
        month: 5,
        year: 1989,
        address_street: '944 Market St.',
        address_city: 'SF',
        address_subdivision: 'CA',
        address_postal_code: '94102',
        address_country_code: 'US',
        virtual_docs: [
          {
            document_value: '2222',
            document_type: 'SSN'
          }
        ],
        physical_docs: [
          {
            document_value: 'data:image/gif;base64,SUQs==',
            document_type: 'GOVT_ID'
          }
        ],
        social_docs: [
          {
            document_value: 'https://www.facebook.com/valid',
            document_type: 'FACEBOOK'
          }
        ]
      }
    ],
    extra: {
      supp_id: '122eddfgbeafrfvbbb',
      cip_tag: 1,
      is_business: false
    }
  },
  '127.0.0.1'
)
.then(user => console.log('USER\n', user))
.catch(error => console.log(error));
```
If needed, you can pass an options object to set a user specific fingerprint or supply an idempotency key:
```javascript
client.createUser(
  {
    "logins": [
      {
        "email": "test@synapsepay.com"
      }
    ],
    "phone_numbers": [
      "901.111.1111"
    ],
    "legal_names": [
      "Test User"
    ],
    "extra": {
      "supp_id": "my_user_id",
      "cip_tag":1,
      "is_business": false
    }
  },
  '127.0.0.1',
  {
    fingerprint: 'userSpecificFingerprint',
    idempotency_key: 'testIdempotencyKey'
  }
)
.then(user => console.log('USER\n', user))
.catch(error => console.log(error));
```
#### Get All Users
```javascript
client.getAllUsers()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.getAllUsers({
  page: 2,
  per_page: 10
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get User
If using a static fingerprint across platform:
```javascript
client.getUser('<USER_ID>')
    .then(user => console.log('USER\n', user))
    .catch(error => console.log(error));
```
If using user specific fingerprints / ip addresses, use the options object to supply those values:
```javascript
client.getUser('<USER_ID>', {
  fingerprint: 'userSpecificFingerprint',
  ip_address: '127.0.0.1'
})
.then(user => console.log('USER\n', user))
.catch(error => console.log(error));
```
The options object can also be used to pass in the optional user full_dehydrate boolean:
```javascript
client.getUser('<USER_ID>', {
  full_dehydrate: true
})
.then(user => console.log('USER\n', user))
.catch(error => console.log(error));
```
#### Get All Platform Transactions
```javascript
client.getPlatformTransactions()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.getPlatformTransactions({
  page: 2,
  per_page: 10,
  filter: '{"supp_id": "supp_1234"}'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get All Platform Nodes
```javascript
client.getPlatformNodes()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.getPlatformNodes({
  page: 2,
  per_page: 10,
  filter: '{"id": "12345"}'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Institutions
```javascript
client.getInstitutions()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Issue Public Key
```javascript
client.issuePublicKey()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to optionally specify which scopes to issue the public key for:
```javascript
client.issuePublicKey([
  'CLIENT|CONTROLS',
  'USER|GET'
])
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Create Subscription
```javascript
client.createSubscription('<SUBSCRIPTION_URL>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to specify the scope of the subscription:
```javascript
client.createSubscription('<SUBSCRIPTION_URL>', [
  'USER|PATCH',
  'NODE|PATCH',
  'TRAN|PATCH'
])
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get All Subscriptions
```javascript
client.getAllSubscriptions()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.getAllSubscriptions({
  page: 2,
  per_page: 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Subscription
```javascript
client.getSubscription('<SUBSCRIPTION_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Update Subscription
To update the scope of subscription:
```javascript
client.updateSubscription('<SUBSCRIPTION_ID>', {
  scope: [
    'USER|PATCH',
    'NODE|PATCH',
    'TRAN|PATCH'
  ]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To unsubscribe from webhooks:
```javascript
client.updateSubscription('<SUBSCRIPTION_ID>', {
  is_active: false
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Locate ATMs
```javascript
client.locateAtms({
  zip: 94114
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.locateAtms({
  zip: 94114,
  page: 2,
  radius: 5,
  per_page: 5
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Verify Address
```javascript
client.verifyAddress({
  address_street: "1 Market St. STE 500",
  address_city: "San Francisco",
  address_subdivision: "CA",
  address_postal_code: "94105",
  address_country_code: "US"
})
```

#### Verify Routing Number
```javascript
client.verifyRoutingNumber({
  routing_num: "084008426",
  type: "ACH-US"
})
```

#### Crypto Quotes
```javascript
client.getCryptoQuotes()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Crypto Market Data
```javascript
client.getCryptoMarketData()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
client.getCryptoMarketData({
  currency: 'ETH',
  limit: 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Webhook Logs
```javascript
client.getWebhookLogs()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Trade Market Data
```javascript
client.getTradeMarketData({
  ticker: 'AAPL'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Dispute Chargeback
```javascript
client.disputeChargeback('<TRANS_ID>', {
  docs: [
    "data:application/pdf;base64,JVBERi....ODY5CiUlRU9GCg==",
  ]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Get Node Types
```javascript
client.getNodeTypes()
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Get User Document Types
```javascript
client.getNodeTypes()
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Get User Entity Types
```javascript
client.getNodeTypes()
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Get User Entity Scopes
```javascript
client.getNodeTypes()
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

## User
#### Add User KYC
```javascript
user.addUserKyc({
  documents:[{
    email: 'test@test.com',
    phone_number: '901.111.1111',
    ip: '::1',
    name: 'Test User',
    alias: 'Test',
    entity_type: 'M',
    entity_scope: 'Arts & Entertainment',
    day: 2,
    month: 5,
    year: 1989,
    address_street: '1 Market St.',
    address_city: 'SF',
    address_subdivision: 'CA',
    address_postal_code: '94114',
    address_country_code: 'US',
    virtual_docs:[{
      document_value: '2222',
      document_type: 'SSN'
    }],
    physical_docs:[{
      document_value: 'data:image/gif;base64,SUQs==',
      document_type: 'GOVT_ID'
    }],
    social_docs:[{
      document_value: 'https://www.facebook.com/valid',
      document_type: 'FACEBOOK'
    }]
  }]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Delete Existing Document
```javascript
user.deleteExistingDocument({
  documents: [{
    id: '<DOC_ID>',
    permission_scope: 'DELETE_DOCUMENT'
  }]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Update User
To update user's base document:
```javascript
user.updateUser({
  documents: [{
    id: '<BASE_DOC_ID>',
    email: 'test2@synapsefi.com'
  }]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To update user's sub-document:
```javascript
user.updateUser({
  documents: [{
    id: '<BASE_DOC_ID>',
    virtual_docs: [{
      id: '<SUB_DOC_ID>',
      document_value: '111-11-2222',
      document_type: 'SSN'
    }]
  }]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To verify user's MFA:
```javascript
user.updateUser({
  documents: [{
    id: '<BASE_DOC_ID>',
    social_docs: [{
      id: '<SUB_DOC_ID>',
      document_value: '901.111.1111',
      document_type: 'PHONE_NUMBER_2FA',
      mfa_answer: '123456'
    }]
  }]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To lock/remove user:
```javascript
user.updateUser({
  permission: 'MAKE-IT-GO-AWAY'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get User Duplicates
To get all user's duplicate instances:
```javascript
user.getUserDuplicates()
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Swap Duplicate User
To swap one closed user profile with another in instances of duplicate profile:
```javascript
user.swapDuplicateUsers("6186069048d2fd5ba26f38ee")
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Create Node
```javascript
user.createNode({
  type: 'DEPOSIT-US',
  info: {
    nickname: 'Test Checking'
  }
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Verify ACH-US MFA
```javascript
user.verifyAchMfa('<access_token>', '<mfa_answer>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Get All User Nodes
```javascript
user.getAllUserNodes()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getAllUserNodes({
  page: 1,
  per_page: 5,
  type: 'ACH-US'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Node
```javascript
user.getNode('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getNode('<NODE_ID>', {
  'full_dehydrate': 'yes'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get User Transactions
```javascript
user.getUserTransactions()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getUserTransactions({
  page: 2,
  per_page: 10,
  filter: '{"id": "1245"}'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Trigger Dummy Transactions
```javascript
user.triggerDummyTransactions('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.triggerDummyTransactions('<NODE_ID>', {
  amount: 1337,
  foreign_transaction: 'no',
  is_credit: 'yes',
  subnet_id: '5cb8ac9e88a3e200d87e1e52',
  type: 'WIRE'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Generate UBO Form
```javascript
user.generateUboForm({
  entity_info: {
    cryptocurrency: true,
    msb: {
      federal: true,
      states: [
        'AL'
      ]
    },
    public_company: false,
    majority_owned_by_listed: false,
    registered_SEC: false,
    regulated_financial: false,
    gambling: false,
    document_id: '<DOC_ID>'
  },
  signer: {
    document_id: '<DOC_ID>',
    relationship_to_entity: 'CEO'
  },
  compliance_contact: {
    document_id: '<DOC_ID>',
    relationship_to_entity: 'CEO'
  },
  primary_controlling_contact: {
    document_id: '<DOC_ID>',
    relationship_to_entity: 'CEO'
  },
  owners: [
    {
      document_id: '<DOC_ID>',
      title: 'CEO',
      ownership: 95
    }
  ]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Statements by User
```javascript
user.getStatementsByUser()
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getStatementsByUser({
  page: 2,
  per_page: 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Statements by Node
```javascript
user.getStatementsByNode('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getStatementsByNode('<NODE_ID>', {
  page: 2,
  per_page: 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Ship Debit Card
```javascript
user.shipCardNode('<NODE_ID>', {
  fee_node_id: '<FEE_NODE_ID>'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Reset Debit Card
```javascript
user.resetCardNode('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Verify Micro-Deposits
```javascript
user.verifyMicroDeposits('<NODE_ID>', {
  micro: [0.1, 0.1]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Reinitiate Micro-Deposits
```javascript
user.reinitiateMicroDeposits('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Update Node
```javascript
user.updateNode('<NODE_ID>', {
  allowed: 'INACTIVE'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Delete Node
```javascript
user.deleteNode('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```

#### Generate Apple Pay Token
```javascript
user.generateApplePayToken('<NODE_ID>', {
  certificate: 'your applepay cert',
  nonce: '9c02xxx2',
  nonce_signature: '4082f883ae62d0700c283e225ee9d286713ef74'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```


#### Generate E Cash Barcode
```javascript
user.generateECashBarcode('<NODE_ID>', {
  amount: {
    amount: 47,
    currency: "USD"
  },
  retailer_id: 2481
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Create Transaction
```javascript
user.createTransaction('<NODE_ID>', {
  to: {
    type: 'ACH-US',
    id: '<NODE_ID>'
  },
  amount: {
    amount: 100.1,
    currency: 'USD'
  },
  extra: {
    ip: '127.0.0.1',
    note: 'Test transaction'
  }
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
OR to pass in optional idempotency key:
```javascript
user.createTransaction(
  '<NODE_ID>',
  {
    to: {
      type: 'ACH-US',
      id: '<NODE_ID>'
    },
    amount: {
      amount: 100.1,
      currency: 'USD'
    },
    extra: {
      ip: '127.0.0.1',
      note: 'Test transaction'
    }
  },
  '<IDEMPOTENCY_KEY>'
)
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Create Batch Transaction
```javascript
user.createBatchTransactions('<NODE_ID>', {
    transactions: [
    {
      "to": {
        "type": "DEPOSIT-US",
        "id": "5f69275098021636016189ad"
      },
      "amount": {
        "amount": 34,
        "currency": "USD"
      },
      "extra": {
        "ip": "127.0.0.1",
        "note": "Banking Fees",
        "idempotency_key": "testidp1"
      }
    },
    {
      "to": {
        "type": "DEPOSIT-US",
        "id": "5f69275098021636016189ad"
      },
      "amount": {
        "amount": 77,
        "currency": "USD"
      },
      "extra": {
        "ip": "127.0.0.1",
        "note": "something for 77 dollars US",
        "idempotency_key": "testidp2"
      }
    }
  ]
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
* <em>Idempotency key is optional</em>

#### Get Transaction
```javascript
user.getTransaction('<NODE_ID>', '<TRANSACTION_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Get All Node Transactions
```javascript
user.getAllNodeTransactions('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getAllNodeTransactions('<NODE_ID>', {
  page: 2,
  per_page: 5,
  filter: '{"id": "12345"}'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Delete Transaction
```javascript
user.deleteTransaction('<NODE_ID>', '<TRANSACTION_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
#### Comment on Status
```javascript
user.commentOnStatus('<NODE_ID>', '<TRANSACTION_ID>', {
  comment: 'add comment'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Dispute Card Transaction
For charge backs:
```javascript
user.disputeCardTransaction('<NODE_ID>', '<TRANSACTION_ID>', {
  dispute_reason: 'CHARGE_BACK'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
For charged twice:
```javascript
user.disputeCardTransaction('<NODE_ID>', '<TRANSACTION_ID>', {
  dispute_reason: 'CHARGED_TWICE'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get All Subnets
```javascript
user.getAllSubnets('<NODE_ID>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
OR to pass in optional query parameters:
```javascript
user.getAllSubnets('<NODE_ID>', {
  page: 2,
  per_page: 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Subnet
```javascript
user.getSubnet('<NODE_ID>', '<SUBNET_ID>', {
  full_dehydrate: true,
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Create Subnet
To issue account / routing number:
```javascript
user.createSubnet('<NODE_ID>', {
  nickname: 'Test AC/RT'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To issue debit card:
```javascript
user.createSubnet('<NODE_ID>', {
  nickname: 'My Debit Card',
  account_class: 'DEBIT_CARD'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Update Subnet
To activate card number:
```javascript
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'ACTIVE'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To deactivate card number:
```javascript
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'INACTIVE'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To set pin for card:
```javascript
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  card_pin: 'mlMKMv5+ekyw9M5AtqUBZxgdzj+GEjzddp93qSPw6uRXGpdNiNulVZxcbH1gGGiwEU9UeOwGmgiMaQsDkpbuh3SWY6IxSiPNHI9ryY8z/z+d8MXockQxsKnl1B+ekcLAXx9s2RZM7T6Nfoa+ABGwRV7aFGt91NYaolA0tfU1981J9juB/iljm9cz5JUKDPCxZbn+LW1f4O/5Pt3fDX9Nrre/HsuHtgc7OIu6XTvg1FCm+ds3AkFdHA0dw1aW4j5biXWVEkNpb01PIicANYXtO/AusqH8udBLh0GIU/xNSTzipk/M2hUqoTZdOo7Hu8UZgLbWUEpv7hAAY2tfu/ymsA=='
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To update card preferences:
```javascript
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  preferences: {
    allow_foreign_transactions: true,
    daily_atm_withdrawal_limit: 100,
    daily_transaction_limit: 1000
  }
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
To delete card:
```javascript
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'TERMINATED'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Push to Mobile Wallet
```javascript
user.pushToMobileWallet(
  nodeId,
  subnet_id,
  {
    "type": "APPLE_PUSH",
    "nonce": "RH0jOQ==",
    "nonce_signature": "QNyNZuy...EFg/Q",
    "certificates": [
      "MIICz....OM/8OPQ7"
    ]
  }
);
```

#### Ship Card Subnet
```javascript
user.shipCard('<NODE_ID>', '<SUBNET_ID>', {
  fee_node_id: '<FEE_NODE_ID>',
  expedite: false,
  card_style_id: '555'
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get All Card Subnet Shipments
```javascript
user.getAllCardShipments('<NODE_ID>', '<SUBNET_ID>', {
  per_page: 10,
  page = 1
})
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Get Card Subnet Shipment
```javascript
user.getCardShipment('<NODE_ID>', '<SUBNET_ID>', '<SHIPMENT_ID>' )
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
#### Delete Card Subnet Shipment
```javascript
user.deleteCardShipment('<NODE_ID>', '<SUBNET_ID>', '<SHIPMENT_ID>')
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```

#### Register New Fingerprint
##### Step 1
```javascript
user.registerNewFingerprint('<FINGERPRINT_VALUE>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
##### Step 2
```javascript
user.supplyDevice2FA('<FINGERPRINT_VALUE>', '<2FA_DEVICE>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```
##### Step 3
```javascript
user.verifyFingerprint2FA('<FINGERPRINT_VALUE>', '<VALIDATION_PIN>')
    .then(({data}) => console.log('DATA\n', data))
    .catch(error => console.log(error));
```

#### Supply Device 2FA
```javascript
user.supplyDevice2FA(
  fingerprint,
  device,
)
```

#### Supply Device 2FA
```javascript
user.verifyFingerprint2FA(
  fingerprint,
  validation_pin,
)
```

#### Supply Device 2FA
```javascript
user.updateIpAddress(
  ip_address,
)
```
#### Idempotent Requests
POST calls support idempotency for safely retrying requests without accidentally performing the same operation twice. Pass the idempotency key you wish to use as a string as the final argument to the POST call. The only exception to this is the POST Create User call, where you must supply the idempotency key in the options object as shown in the [Create User](#create-user) section.
```javascript
user.createNode(
  {
    type: 'DEPOSIT-US',
    info: {
      nickname: 'My Checking'
    }
  },
  '<IDEMPOTENCY_KEY>'
)
.then(({data}) => console.log('DATA\n', data))
.catch(error => console.log(error));
```
