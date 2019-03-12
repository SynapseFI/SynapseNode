# SynapseNode
![npm](https://img.shields.io/npm/v/synapsenode.svg)
![status](https://img.shields.io/badge/status-beta-yellow.svg)  
Node.js Client Library for SynapseFI REST V3.1 API

## Code Examples
Please refer to [samples.md](samples.md) and our [API documentation](https://docs.synapsefi.com) for examples.

## Setup
```
npm install synapsenode
```

## Initialization
Require and configure dotenv:
```
require('dotenv').config()
```
Create a .env file at the root directory and add the following variables to it:
```
CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>
FINGERPRINT=<YOUR_FINGERPRINT>
```
Initialize new Client:
```
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
