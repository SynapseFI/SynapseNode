const apiRequests = require('../apiReqs/apiRequests');

class User {
  constructor({
    id,
    fingerprint,
    oauth_key,
    refresh_token,
    ip_address,
    client
  }) {
    this.id = id;
    this.fingerprint = fingerprint;
    this.oauth_key = oauth_key;
    this.refresh_token = refresh_token;
    this.ip_address = ip_address;
    this.client = client;
  }

  // ADD NEW DOCUMENTS
  addNewDocuments(bodyParams = {}) {
    return apiRequests.user[addNewDocuments]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // UPDATE EXISTING DOCUMENT
  updateExistingDocument(bodyParams = {}) {
    return apiRequests.user[updateExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // DELETE EXISTING DOCUMENTS
  deleteExistingDocument(bodyParams = {}) {
    return apiRequests.user[deleteExistingDocument]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }

  // UPDATE USER
  updateUser(bodyParams = {}) {
    return apiRequests.user[updateUser]({
      user_id: this.id,
      bodyParams,
      userInfo: this
    });
  }
}

module.exports = User;
