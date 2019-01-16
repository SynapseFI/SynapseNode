# SynapseFI-Node-v2
SynapseFI Node.js API Wrapper Version 2

## Code Examples
Please refer to [samples.md](samples.md) and our [API documentation](https://docs.synapsefi.com) for examples.

## Setup
Run the following command from the root package directory
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
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
});
```

## Testing
Run the following command from the root package directory
```
npm test
```

## License
[MIT License](LICENSE)
