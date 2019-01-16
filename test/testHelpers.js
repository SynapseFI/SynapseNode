const Client = require('../src/lib/Client');

const Helpers = {
  client: new Client({
    client_id: '',
    client_secret: '',
    fingerprint: '',
    ip_address: '127.0.0.1',
    isProduction: false
  })
};

module.exports = Helpers;
