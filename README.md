# SynapseFI-Node-v2
SynapseFI Node.js API Wrapper Version 2 https://docs.synapsefi.com

## Setup
```
npm install
```

## Initialization
```
const Client = require('./src/lib/Client');

const client = new Client({
  client_id: '<client_id>',
  client_secret: '<client_secret>',
  fingerprint: '<fingerprint>',
  ip_address: '<ip_address>',
  isProduction: '<isProduction>'
});
```

## Samples
#### Create User
```
client.createUser({
    "logins": [
      {
        "email": "test@synapsefi.com"
      }
    ],
    "phone_numbers": [
      "901.111.1111",
      "test@synapsefi.com"
    ],
    "legal_names": [
      "Test User"
    ],
    "documents": [
      {
        "email": "test@test.com",
        "phone_number": "901.111.1111",
        "ip": "::1",
        "name": "Test User",
        "alias": "Test",
        "entity_type": "M",
        "entity_scope": "Arts & Entertainment",
        "day": 2,
        "month": 5,
        "year": 1989,
        "address_street": "944 Market St.",
        "address_city": "SF",
        "address_subdivision": "CA",
        "address_postal_code": "94102",
        "address_country_code": "US",
        "virtual_docs": [
          {
            "document_value": "2222",
            "document_type": "SSN"
          }
        ],
        "physical_docs": [
          {
            "document_value": "data:image/gif;base64,SUQs==",
            "document_type": "GOVT_ID"
          }
        ],
        "social_docs": [
          {
            "document_value": "https://www.facebook.com/valid",
            "document_type": "FACEBOOK"
          }
        ]
      }
    ],
    "extra": {
      "supp_id": "122eddfgbeafrfvbbb",
      "cip_tag": 1,
      "is_business": false
    }
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
```
client.getUser('<USER_ID>')
.then(( user ) => {
  console.log('user ', user);
});
```
OR to pass in optional full_dehydrate field:
```
client.getUser('<USER_ID>', true)
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
