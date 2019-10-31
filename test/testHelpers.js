const Client = require('../src/lib/Client');
const dotenv = require('dotenv');

dotenv.config();

const Helpers = {
  client: new Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    fingerprint: process.env.FINGERPRINT,
    ip_address: '127.0.0.1',
    host: 'https://uat-api.synapsefi.com/v3.1'
  })
};

module.exports = Helpers;
