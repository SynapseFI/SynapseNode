
const { default: dotenv } = require('dotenv');
import Client from '../src/lib/Client';

// dotenv.config();

export const Helpers = {
  client: new Client({
    client_id: '',
    client_secret: '',
    fingerprint: '',
    ip_address: '127.0.0.1',
    isProduction: false
  })
};


