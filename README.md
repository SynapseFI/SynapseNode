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
  bodyParams: {
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
});
```
#### Get All Users
```
client.getAllUsers();
```
OR to pass in optional query parameters
```
client.getAllUsers({
  page: 2,
  per_page: 10
});
```
#### Get User
```
client.getUser('5bf493e3baabfc00a31db486');
```
OR to pass in optional full_dehydrate field:
```
client.getUser('5bf493e3baabfc00a31db486', 'yes');
```
#### Get All Platform Transactions
```
client.getPlatformTransactions();
```
#### Get All Platform Nodes
```
client.getPlatformNodes();
```
#### Get Institutions
```
client.getInstitutions();
```
#### Issue Public Key
```
client.issuePublicKey();
```
#### Create Subscription
```
client.createSubscription('https://webhook.site/4e8bb189-68cb-4d85-8ae5-291a1cea65f9');
```
#### Get All Subscriptions
```
client.getAllSubscriptions();
```
#### Get Subscription
```
client.getSubscription('5bdcc4bb06896300c0dcdc5c');
```
#### Update Subscription
```
client.updateSubscription('5bdcc4bb06896300c0dcdc5c', {
  is_active: false
});
```
