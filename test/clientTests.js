const expect = require('chai').expect;
const Helpers = require('./testHelpers');
const User = require('../src/lib/User');

const createUserPayload = {
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

const mochaAsync = fn => {
  return done => {
    fn.call().then(done, err => {
      if (err) {
        console.log('MOCHA_ASYNC: ', err);
        // console.log(err.response.data.error);
      }
      done(err);
    });
  };
}

describe('Client', () => {

  describe('post create user', () => {
    it('should create a user object', mochaAsync(async () => {
      const response = await Helpers.client.createUser(createUserPayload);
      expect(response.id).to.not.be.null;
      expect(response).to.be.an.instanceof(User);
    }));
  });

  describe('get all users', () => {
    it('should return all users', mochaAsync(async () => {
      const response = await Helpers.client.getAllUsers();
      expect(response.status).to.equal(200);
      expect(response.data.users.length).to.be.above(0);
    }));
  });

  describe('get user with userID', () => {
    it('should return correct user', mochaAsync(async () => {
      const response = await Helpers.client.getUser('5bf493e3baabfc00a31db486');
      expect(response.id).to.equal('5bf493e3baabfc00a31db486');
      expect(response).to.be.an.instanceof(User);
    }));
  });

  describe('get platform transactions', () => {
    it('should return all platform transactions', mochaAsync(async () => {
      const response = await Helpers.client.getPlatformTransactions();
      expect(response.status).to.equal(200);
      expect(response.data.trans.length).to.be.above(0);
    }));
  });

  describe('get platform nodes', () => {
    it('should return all platform nodes', mochaAsync(async () => {
      const response = await Helpers.client.getPlatformNodes();
      expect(response.status).to.equal(200);
      expect(response.data.nodes.length).to.be.above(0);
    }));
  });

  describe('get institutions', () => {
    it('should return all institutions', mochaAsync(async () => {
      const response = await Helpers.client.getInstitutions();
      expect(response.status).to.equal(200);
      expect(response.data.banks.length).to.be.above(0);
    }));
  });

  describe('get issue public key', () => {
    it('should issue public key', mochaAsync(async () => {
      const response = await Helpers.client.issuePublicKey();
      expect(response.status).to.equal(200);
      expect(response.data.public_key_obj.expires_in).to.equal('900');
    }));
  });

  describe('post create subscription', () => {
    it('should create new subscription', mochaAsync(async () => {
      const response = await Helpers.client.createSubscription('https://webhook.site/4e8bb189-68cb-4d85-8ae5-291a1cea65f9');
      expect(response.status).to.equal(200);
      expect(response.data._id).to.not.be.null;
    }));
  });

  describe('get all subscriptions', () => {
    it('should return all subscriptions', mochaAsync(async () => {
      const response = await Helpers.client.getAllSubscriptions();
      expect(response.status).to.equal(200);
      expect(response.data.subscriptions.length).to.be.above(0);
    }));
  });

  describe('get subscription with subscriptionID', () => {
    it('should return correct subscription', mochaAsync(async () => {
      const response = await Helpers.client.getSubscription('5bdcc4bb06896300c0dcdc5c');
      expect(response.status).to.equal(200);
      expect(response.data._id).to.equal('5bdcc4bb06896300c0dcdc5c');
    }));
  });

  describe('patch update subscription', () => {
    it('should update subscription', mochaAsync(async () => {
      const response = await Helpers.client.updateSubscription(
        '5bdcc4bb06896300c0dcdc5c',
        {
          is_active: false
        }
      );
      expect(response.status).to.equal(200);
      expect(response.data.is_active, false);
    }));
  });

  describe('get locate atms', () => {
    it('should retrieve atms', mochaAsync(async () => {
      const response = await Helpers.client.locateAtms();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get crypto quotes', () => {
    it('should retrieve crypto quotes', mochaAsync(async () => {
      const response = await Helpers.client.getCryptoQuotes();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get crypto market data', () => {
    it('should retrieve crypto market data', mochaAsync(async () => {
      const response = await Helpers.client.getCryptoMarketData();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get webhook logs', () => {
    it('should retrieve webhook logs', mochaAsync(async () => {
      const response = await Helpers.client.getWebhookLogs();
      console.log(response);
      expect(response.status).to.equal(200);
    }));
  });
});
