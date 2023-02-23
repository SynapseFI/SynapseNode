# SynapseNode
![npm](https://img.shields.io/npm/v/synapsenode.svg)
![status](https://img.shields.io/badge/status-beta-yellow.svg)
Node.js Client Library for SynapseFI REST V3.1 API

## Code Examples
Please refer to [samples.md](https://github.com/SynapseFI/SynapseNode/blob/master/samples.md) and our [API documentation](https://docs.synapsefi.com) for examples.

## Setup

We are proud to release a new major version (`2.0.0`) in beta, written in typescript to improve developer experience. These changes were designed to be backwards compatible. Though this is a major version upgrade, there should be no impact to upgrading. We recommend test these in a sandbox environment before deploying to a live production environment.

to try out the newest version:
```
npm install synapsenode@latest
```


## Update
To update to the most recent version of synapsenode
```
npm update synapsenode
```

## Initialization
Require and configure dotenv:
```javascript
require('dotenv').config()
```
Create a .env file at the root directory and add the following variables to it:
```
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
FINGERPRINT=<YOUR_FINGERPRINT>
```
Initialize new Client:
```javascript
const Synapse = require('synapsenode');
const Client = Synapse.Client;

const client = new Client({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  fingerprint: process.env.FINGERPRINT,
  ip_address: '<ip_address>',
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
});
```

## Testing
Run the following command from the root package directory after the .env file is set up and '<OBJ_ID>' values are replaced in the test files:
```
npm test
```

## License
[MIT License](LICENSE)
