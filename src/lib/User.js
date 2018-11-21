const apiRequests = require('../apiReqs/apiRequests');

class User {
  constructor({
    id,
    fingerprint,
    oauth_key,
    refresh_token,
    ip_address
  }) {
    this.id = id;
    this.fingerprint = fingerprint;
    this.oauth_key = oauth_key;
    this.refresh_token = refresh_token;
    this.ip_address = ip_address;
  }


}

module.exports = User;
