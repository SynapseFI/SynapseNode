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
  * [Get Crypto Quotes](#crypto-quotes)
  * [Get Crypto Market Data](#crypto-market-data)
  * [Get Webhook Logs](#webhook-logs)
  * [Get Trade Market Data](#trade-market-data)
- [User](#user)
  * [Add User KYC](#add-user-kyc)
  * [Delete Existing Document](#delete-existing-document)
  * [Update User](#update-user)
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
  * [Create Transaction](#create-transaction)
  * [Get Transaction](#get-transaction)
  * [Get All Node Transactions](#get-all-node-transactions)
  * [Delete Transaction](#delete-transaction)
  * [Comment on Status](#comment-on-status)
  * [Dispute Card Transaction](#dispute-card-transaction)
  * [Get All Subnets](#get-all-subnets)
  * [Get Subnet](#get-subnet)
  * [Create Subnet](#create-subnet)
  * [Update Subnet](#update-subnet)
  * [Ship Card Subnet](#ship-card-subnet)
  * [Register New Fingerprint](#register-new-fingerprint)
- [Idempotent Requests](#idempotent-requests)

## Initialization
```
const Synapse = require('synapsenode');
const Client = Synapse.Client;

# instantiate new client:
const client = new Client({
  client_id: '<client_id>',
  client_secret: '<client_secret>',
  fingerprint: '<fingerprint>',
  ip_address: '<ip_address>',
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
});

# createUser or getUser to access User class methods
const user = client.createUser({
  logins: [
    {
      email: 'test@synapsepay.com'
    }
  ],
  phone_numbers: [
    '901.111.1111'
  ],
  legal_names: [
    'Test User'
  ],
  extra: {
    supp_id: 'my_user_id',
    cip_tag: 1,
    is_business: false
  }
}, '127.0.0.1') || client.getUser('<USER_ID>');
```

## Client
#### Create User
To create a user - supply the payload and the user IP address:
```
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
.then(( user ) => {
  console.log('user ', user);
});
```
If needed, you can pass an options object to set a user specific fingerprint or supply an idempotency key:
```
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
.then(( user ) => {
  console.log('user ', user);
});
```
#### Get All Users
```
client.getAllUsers()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.getAllUsers({
  page: 2,
  per_page: 10
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get User
If using a static fingerprint across platform:
```
client.getUser('<USER_ID>')
.then(( user ) => {
  console.log('user ', user);
});
```
If using user specific fingerprints / ip addresses, use the options object to supply those values:
```
client.getUser('<USER_ID>', {
  fingerprint: 'userSpecificFingerprint',
  ip_address: '127.0.0.1'
})
.then(( user ) => {
  console.log('user ', user);
});
```
The options object can also be used to pass in the optional user full_dehydrate boolean:
```
client.getUser('<USER_ID>', {
  full_dehydrate: true
})
.then(( user ) => {
  console.log('user ', user);
});
```
#### Get All Platform Transactions
```
client.getPlatformTransactions()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.getPlatformTransactions({
  page: 2,
  per_page: 10
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get All Platform Nodes
```
client.getPlatformNodes()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.getPlatformNodes({
  page: 2,
  per_page: 10
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Institutions
```
client.getInstitutions()
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Issue Public Key
```
client.issuePublicKey()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to optionally specify which scopes to issue the public key for:
```
client.issuePublicKey([
  'CLIENT|CONTROLS',
  'USER|GET'
])
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Create Subscription
```
client.createSubscription('<SUBSCRIPTION_URL>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to specify the scope of the subscription:
```
client.createSubscription('<SUBSCRIPTION_URL>', [
  'USER|PATCH',
  'NODE|PATCH',
  'TRAN|PATCH'
])
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get All Subscriptions
```
client.getAllSubscriptions()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.getAllSubscriptions({
  page: 2,
  per_page: 1
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Subscription
```
client.getSubscription('<SUBSCRIPTION_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Update Subscription
To update the scope of subscription:
```
client.updateSubscription('<SUBSCRIPTION_ID>', {
  scope: [
    'USER|PATCH',
    'NODE|PATCH',
    'TRAN|PATCH'
  ]
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To unsubscribe from webhooks:
```
client.updateSubscription('<SUBSCRIPTION_ID>', {
  is_active: false
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Locate ATMs
```
client.locateAtms({
  zip: 94114
})
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.locateAtms({
  zip: 94114,
  page: 2,
  radius: 5,
  per_page: 5
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Crypto Quotes
```
client.getCryptoQuotes()
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Crypto Market Data
```
client.getCryptoMarketData()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
client.getCryptoMarketData({
  currency: 'ETH',
  limit: 1
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Webhook Logs
```
client.getWebhookLogs()
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Trade Market Data
```
client.getTradeMarketData({
  ticker: 'AAPL'
})
.then(({ data }) => {
  console.log('data ', data);
}
```

## User
#### Add User KYC
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Delete Existing Document
```
user.deleteExistingDocument({
  documents: [{
    id: '<DOC_ID>',
    permission_scope: 'DELETE_DOCUMENT'
  }]
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Update User
To update user's base document:
```
user.updateUser({
  documents: [{
    id: '<BASE_DOC_ID>',
    email: 'test2@synapsefi.com'
  }]
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To update user's sub-document:
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
To verify user's MFA:
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
To lock/remove user:
```
user.updateUser({
  permission: 'MAKE-IT-GO-AWAY'
})
.then(({ data }) => {
  console.log('data ', data);
})
```
#### Create Node
```
user.createNode({
  type: 'DEPOSIT-US',
  info: {
    nickname: 'Test Checking'
  }
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Verify ACH-US MFA
```
user.verifyAchMfa('<access_token>', '<mfa_answer>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get All User Nodes
```
user.getAllUserNodes()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getAllUserNodes({
  page: 1,
  per_page: 5,
  type: 'ACH-US'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Node
```
user.getNode('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getNode('<NODE_ID>', {
  'full_dehydrate': 'yes'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get User Transactions
```
user.getUserTransactions()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getUserTransactions({
  page: 2,
  per_page: 10
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Trigger Dummy Transactions
```
user.triggerDummyTransactions('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.triggerDummyTransactions('<NODE_ID>', {
	foreign_transaction: 'no',
	is_credit: 'yes',
	subnet_id: '5cb8ac9e88a3e200d87e1e52',
	type: 'WIRE'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Generate UBO Form
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Statements by User
```
user.getStatementsByUser()
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getStatementsByUser({
  page: 2,
  per_page: 1
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Statements by Node
```
user.getStatementsByNode('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getStatementsByNode('<NODE_ID>', {
  page: 2,
  per_page: 1
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Ship Debit Card
```
user.shipCardNode('<NODE_ID>', {
  fee_node_id: '<FEE_NODE_ID>'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Reset Debit Card
```
user.resetCardNode('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Verify Micro-Deposits
```
user.verifyMicroDeposits('<NODE_ID>', {
  micro: [0.1, 0.1]
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Reinitiate Micro-Deposits
```
user.reinitiateMicroDeposits('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Reauthorize Account
```
user.reauthorizeAccount('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Update Node
```
user.updateNode('<NODE_ID>', {
  allowed: 'INACTIVE'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Delete Node
```
user.deleteNode('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Generate Apple Pay Token
```
user.generateApplePayToken('<NODE_ID>', {
  certificate: 'your applepay cert',
  nonce: '9c02xxx2',
  nonce_signature: '4082f883ae62d0700c283e225ee9d286713ef74'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Create Transaction
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional idempotency key:
```
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
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Transaction
```
user.getTransaction('<NODE_ID>', '<TRANSACTION_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get All Node Transactions
```
user.getAllNodeTransactions('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getAllNodeTransactions('<NODE_ID>', {
  page: 2,
  per_page: 5
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Delete Transaction
```
user.deleteTransaction('<NODE_ID>', '<TRANSACTION_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Comment on Status
```
user.commentOnStatus('<NODE_ID>', '<TRANSACTION_ID>', {
  comment: 'add comment'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Dispute Card Transaction
For charge backs:
```
user.disputeCardTransaction('<NODE_ID>', '<TRANSACTION_ID>', {
  dispute_reason: 'CHARGE_BACK'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
For charged twice:
```
user.disputeCardTransaction('<NODE_ID>', '<TRANSACTION_ID>', {
  dispute_reason: 'CHARGED_TWICE'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get All Subnets
```
user.getAllSubnets('<NODE_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
OR to pass in optional query parameters:
```
user.getAllSubnets('<NODE_ID>', {
  page: 2,
  per_page: 1
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Get Subnet
```
user.getSubnet('<NODE_ID>', '<SUBNET_ID>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Create Subnet
To issue account / routing number:
```
user.createSubnet('<NODE_ID>', {
  nickname: 'Test AC/RT'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To issue debit card:
```
user.createSubnet('<NODE_ID>', {
  nickname: 'My Debit Card',
  account_class: 'DEBIT_CARD'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Update Subnet
To activate card number:
```
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'ACTIVE'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To deactivate card number:
```
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'INACTIVE'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To set pin for card:
```
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  card_pin: 'mlMKMv5+ekyw9M5AtqUBZxgdzj+GEjzddp93qSPw6uRXGpdNiNulVZxcbH1gGGiwEU9UeOwGmgiMaQsDkpbuh3SWY6IxSiPNHI9ryY8z/z+d8MXockQxsKnl1B+ekcLAXx9s2RZM7T6Nfoa+ABGwRV7aFGt91NYaolA0tfU1981J9juB/iljm9cz5JUKDPCxZbn+LW1f4O/5Pt3fDX9Nrre/HsuHtgc7OIu6XTvg1FCm+ds3AkFdHA0dw1aW4j5biXWVEkNpb01PIicANYXtO/AusqH8udBLh0GIU/xNSTzipk/M2hUqoTZdOo7Hu8UZgLbWUEpv7hAAY2tfu/ymsA=='
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To update card preferences:
```
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  preferences: {
    allow_foreign_transactions: true,
    daily_atm_withdrawal_limit: 100,
    daily_transaction_limit: 1000
  }
})
.then(({ data }) => {
  console.log('data ', data);
});
```
To delete card:
```
user.updateSubnet('<NODE_ID>', '<SUBNET_ID>', {
  status: 'TERMINATED'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Ship Card Subnet
```
user.shipCard('<NODE_ID>', '<SUBNET_ID>', {
  fee_node_id: '<FEE_NODE_ID>',
  expedite: false,
  card_style_id: '555'
})
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Register New Fingerprint
##### Step 1
```
user.registerNewFingerprint('<FINGERPRINT_VALUE>')
.then(({ data }) => {
  console.log('data ', data);
});
```
##### Step 2
```
user.supplyDevice2FA('<FINGERPRINT_VALUE>', '<2FA_DEVICE>')
.then(({ data }) => {
  console.log('data ', data);
});
```
##### Step 3
```
user.verifyFingerprint2FA('<FINGERPRINT_VALUE>', '<VALIDATION_PIN>')
.then(({ data }) => {
  console.log('data ', data);
});
```
#### Idempotent Requests
POST calls support idempotency for safely retrying requests without accidentally performing the same operation twice. Pass the idempotency key you wish to use as a string as the final argument to the POST call. The only exception to this is the POST Create User call, where you must supply the idempotency key in the options object as shown in the [Create User](#create-user) section.
```
user.createNode(
  {
    type: 'DEPOSIT-US',
    info: {
      nickname: 'My Checking'
    }
  },
  '<IDEMPOTENCY_KEY>'
);
```
