const expect = require('chai').expect;
const Helpers = require('./testHelpers');

const mochaAsync = fn => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
}

describe('User', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await Helpers.client.getUser('<USER_ID>');
  });

  describe('patch delete existing document', () => {
    it('should remove specified document', mochaAsync(async () => {
      const response = await testUser.deleteExistingDocument({
        documents: [{
          id: testUser.body.documents[0].id,
          physical_docs: [{
            id: testUser.body.documents[0].physical_docs[0].id,
            document_type: 'DELETE_DOCUMENT',
            document_value: "data:image/gif;base64,SUQs=="
          }]
        }]
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch update user', () => {
    it('should update user', mochaAsync(async () => {
      const response = await testUser.updateUser({
        update: {
          cip_tag: 2
        }
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create node', () => {
    it('should create node', mochaAsync(async () => {
      const response = await testUser.createNode({
        type: 'DEPOSIT-US',
        info: {
          nickname: 'My Test Checking'
        }
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('post ach-us mfa', () => {
    it('should verify bank login mfa', mochaAsync(async () => {
      // create ach-us node w/ bank logins
      const achNode = await testUser.createNode({
        type: 'ACH-US',
        info: {
          bank_id: 'synapse_good',
          bank_pw: 'test1234',
          bank_name: 'fake'
        }
      });
      expect(achNode.status).to.equal(202);
      // verify bank login mfa
      const response = await testUser.verifyAchMfa(
        achNode.data.mfa.access_token,
        'test_answer'
      );
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all user nodes', () => {
    it('should return all nodes for a user', mochaAsync(async () => {
      const response = await testUser.getAllUserNodes();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get node w/ nodeID', () => {
    it('should return specified node', mochaAsync(async () => {
      const response = await testUser.getNode('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all user transactions', () => {
    it('should return all transactions for a user', mochaAsync(async () => {
      const response = await testUser.getUserTransactions();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get trigger dummy transactions', () => {
    it('should trigger dummy transactions', mochaAsync(async () => {
      const response = await testUser.triggerDummyTransactions('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));

    it('should trigger dummy transaction with amount', mochaAsync(async () => {
      const response = await testUser.triggerDummyTransactions('<NODE_ID>', {amount: '<AMOUNT>'});
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch generate ubo form', () => {
    it('should generate new ubo form', mochaAsync(async () => {
      const user = await Helpers.client.getUser('<BUSINESS_USER_ID');
      const response = await user.generateUboForm({
        signer: {
          document_id: '<BENEFICIAL_OWNER_BASE_DOC_ID>',
          relationship_to_entity: 'CEO'
        },
        entity_info: {
          document_id: '<BUSINESS_BASE_DOC_ID>',
          gambling: false,
          cryptocurrency: false,
          public_company: false,
          majority_owned_by_listed: false,
          registered_SEC: false,
          regulated_financial: false,
          msb: {
            federal: false,
            states: []
          }
        },
        primary_controlling_contact: {
          document_id: '<BENEFICIAL_OWNER_BASE_DOC_ID>',
          relationship_to_entity: 'CEO'
        },
        compliance_contact: {
          document_id: '<BENEFICIAL_OWNER_BASE_DOC_ID>',
          relationship_to_entity: 'CEO'
        },
        owners: [
          {
          document_id: '<BENEFICIAL_OWNER_BASE_DOC_ID>',
          title: 'CEO',
          ownership: 95
          }
        ]
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('get statements by user', () => {
    it('should retrieve statements by specified user', mochaAsync(async () => {
      const response = await testUser.getStatementsByUser();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get statements by node', () => {
    it('should retrive statements by specified node', mochaAsync(async () => {
      const response = await testUser.getStatementsByNode('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch ship debit card', () => {
    it('should ship debit card', mochaAsync(async () => {
      const response = await testUser.shipCardNode('<NODE_ID>', {
        fee_node_id: '<FEE_NODE_ID>'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch reset debit card', () => {
    it('should reset debit card', mochaAsync(async () => {
      const response = await testUser.resetCardNode('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch verify micro-deposits', () => {
    it('should verify micro-deposits', mochaAsync(async () => {
      // create ach-us node w/ ac/rt
      const achNode = await testUser.createNode({
        type: 'ACH-US',
        info: {
          nickname: 'Test Account',
          account_num: '1232225674134',
          routing_num: '051000017',
          type: 'PERSONAL',
          class: 'CHECKING'
        }
      });
      expect(achNode.status).to.equal(200);
      // verify micro-deposits
      const response = await testUser.verifyMicroDeposits(achNode.data.nodes[0]._id, {
        micro: [0.1, 0.1]
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch reinitiate micro-deposits', () => {
    it('should reinitiate microdeposits', mochaAsync(async () => {
      const response = await testUser.reinitiateMicroDeposits('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch reauthorize account', () => {
    it('should reauthoirze account', mochaAsync(async () => {
      const response = await testUser.reauthorizeAccount('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch update node', () => {
    it('should update node', mochaAsync(async () => {
      const response = await testUser.updateNode('<NODE_ID>', {
        nickname: 'New Nickname'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('delete node', () => {
    it('should delete node', mochaAsync(async () => {
      const response = await testUser.deleteNode('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch generate apple pay token', () => {
    it('should generate new apple pay token', mochaAsync(async () => {
      const response = await testUser.generateApplePayToken('<NODE_ID>', {
        certificate: 'your applepay cert',
        nonce: '9c02xxx2',
        nonce_signature: '4082f883ae62d0700c283e225ee9d286713ef74'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create transaction', () => {
    it('should create new transaction', mochaAsync(async () => {
      const response = await testUser.createTransaction('<NODE_ID>', {
        to: {
          type: '<NODE_TYPE>',
          id: '<NODE_ID>'
        },
        amount: {
          amount: 5.0,
          currency: 'USD'
        },
        extra: {
          ip: '127.0.0.1'
        }
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('get transaction w/ transactionID', () => {
    it('should retrive specified transaction', mochaAsync(async () => {
      const response = await testUser.getTransaction('<NODE_ID>', '<TRXN_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all node transactions', () => {
    it('should retrive all node transaction', mochaAsync(async () => {
      const response = await testUser.getAllNodeTransactions('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('delete transaction', () => {
    it('should delete specified transaction', mochaAsync(async () => {
      // create transaction
      const txn = await testUser.createTransaction('<NODE_ID>', {
        to: {
          type: '<NODE_TYPE>',
          id: '<NODE_ID>'
        },
        amount: {
          amount: 5.0,
          currency: 'USD'
        },
        extra: {
          ip: '127.0.0.1'
        }
      });
      expect(txn.status).to.equal(200);
      // delete transaction
      const response = await testUser.deleteTransaction('<NODE_ID>', txn.data._id);
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch comment on status', () => {
    it('should comment on transaction status', mochaAsync(async () => {
      // create transaction
      const txn = await testUser.createTransaction('<NODE_ID>', {
        to: {
          type: '<NODE_TYPE>',
          id: '<NODE_ID>'
        },
        amount: {
          amount: 5.0,
          currency: 'USD'
        },
        extra: {
          ip: '127.0.0.1'
        }
      });
      expect(txn.status).to.equal(200);
      // comment on status
      const response = await testUser.commentOnStatus('<NODE_ID>', txn.data._id, {
        comment: 'my comment'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch dispute card transaction', () => {
    it('should submit dispute of card transaction', mochaAsync(async () => {
      const response = await testUser.disputeCardTransaction('<NODE_ID>', '<TRXN_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all subnets', () => {
    it('should retrieve all user subnets', mochaAsync(async () => {
      const response = await testUser.getAllSubnets('<NODE_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get subnet w/ subnetID', () => {
    it('should retrieve specified subnet', mochaAsync(async () => {
      const response = await testUser.getSubnet('<NODE_ID>', '<SUBNET_ID>');
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create subnet', () => {
    it('should create subnet', mochaAsync(async () => {
      const response = await testUser.createSubnet('<NODE_ID>', {
        nickname: 'Test Subnet'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('register new fingerprint', () => {
    it('should submit new fingerprint', mochaAsync(async () => {
      const response = await testUser.registerNewFingerprint('newTestFingerprint123');
      expect(response.status).to.equal(202);
    }));

    it('should submit 2fa device', mochaAsync(async () => {
      const response = await testUser.supplyDevice2FA('newTestFingerprint123', '<2FA_DEVICE>');
      expect(response.status).to.equal(202);
    }));
  });

  describe('verify fingerprint 2fa', () => {
    it('should verify fingerprint 2fa', mochaAsync(async () => {
      const response = await testUser.verifyFingerprint2FA('newTestFingerprint123', '<2FA_CODE>');
      expect(response.status).to.equal(200);
    }));
  });
});
