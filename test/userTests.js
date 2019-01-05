const expect = require('chai').expect;
const Helpers = require('./testHelpers');

const mochaAsync = fn => {
  return done => {
    fn.call().then(done, err => {
      if (err) {
        console.log(err);
        // console.log(err.response.data.error);
      }
      done(err);
    });
  };
}

describe('User', () => {
  let testUser;

  beforeEach(async () => {
    try {
      testUser = await Helpers.client.getUser('5c1009d75596f200c40e7947');
    } catch (e) {
      console.log('bE ERR: ', e.response.data);
    }
  });

  describe('patch add new documents', () => {
    it('should add new base document', mochaAsync(async () => {
      const response = await testUser.addNewDocuments({
        documents: [
          {
            email: "test@test.com",
            phone_number: "901.111.1111",
            ip: "::1",
            name: "Test User",
            alias: "Test",
            entity_type: "M",
            entity_scope: "Arts & Entertainment",
            day: 2,
            month: 5,
            year: 1989,
            address_street: "44 Tehama St.",
            address_city: "San Francisco",
            address_subdivision: "CA",
            address_postal_code: "94105",
            address_country_code: "US",
            virtual_docs: [{
              document_value: '111-111-2222',
              document_type: 'SSN'
            }],
            physical_docs: [{
              document_value: 'data:image/gif;base64,SUQs==',
              document_type: 'GOVT_ID'
            }]
          }
        ]
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch update existing document', () => {
    it('should update existing base document', mochaAsync(async () => {
      const response = await testUser.updateExistingDocument({
        documents: [{
          id: testUser.body.documents[0].id,
          virtual_docs: [{
            id: testUser.body.documents[0].virtual_docs[0].id,
            document_value: "111-11-3333",
            document_type: "SSN"
          }]
        }]
      });
      expect(response.status).to.equal(200);
    }));
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
      const response = await testUser.getNode('5c1012086a294e00611bc803');
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
      const response = await testUser.triggerDummyTransactions('5c1012086a294e00611bc803');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch generate ubo form', () => {
    it('should generate new ubo form', mochaAsync(async () => {
      const user = await Helpers.client.getUser('5c11b0995596f200c6132b37');
      await user.oauthUser({
        refresh_token: user.body.refresh_token
      });
      const response = await user.generateUboForm({
        signer: {
          document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
          relationship_to_entity: 'CEO'
        },
        entity_info: {
          document_id: '81922e855f703faf281d506ccf13b8ea931f9d91c984b1a1212fcae4c7ed0d4e',
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
          document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
          relationship_to_entity: 'CEO'
        },
        compliance_contact: {
          document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
          relationship_to_entity: 'CEO'
        },
        owners: [
          {
          document_id: '2a4a5957a3a62aaac1a0dd0edcae96ea2cdee688ec6337b20745eed8869e3ac8',
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
      const response = await testUser.getStatementsByNode('5c1012086a294e00611bc803');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch ship debit card', () => {
    it('should ship debit card', mochaAsync(async () => {
      const response = await testUser.shipDebitCard('5c10366058b87200631010f4', {
        fee_node_id: '5b7b32df55a94c00765be804'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch reset debit card', () => {
    it('should reset debit card', mochaAsync(async () => {
      const response = await testUser.resetDebitCard('5c10366058b87200631010f4');
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
      const response = await testUser.reinitiateMicroDeposits('5c1040f258b87200631013fe');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch update node', () => {
    it('should update node', mochaAsync(async () => {
      const response = await testUser.updateNode('5c1012086a294e00611bc803', {
        nickname: 'New Nickname'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('delete node', () => {
    it('should delete node', mochaAsync(async () => {
      const response = await testUser.deleteNode('5c1040f258b87200631013fe');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch generate apple pay token', () => {
    it('should generate new apple pay token', mochaAsync(async () => {
      const response = await testUser.generateApplePayToken('5c10366058b87200631010f4', {
        certificate: 'your applepay cert',
        nonce: '9c02xxx2',
        nonce_signature: '4082f883ae62d0700c283e225ee9d286713ef74'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create transaction', () => {
    it('should create new transaction', mochaAsync(async () => {
      const response = await testUser.createTransaction('5c1013558b76a20067e70f6a', {
        to: {
          type: 'DEPOSIT-US',
          id: '5c1012086a294e00611bc803'
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
      const response = await testUser.getTransaction('5c1013558b76a20067e70f6a', '5c10519f6a81c9008bbf72e5');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all node transactions', () => {
    it('should retrive all node transaction', mochaAsync(async () => {
      const response = await testUser.getAllNodeTransactions('5c1013558b76a20067e70f6a');
      expect(response.status).to.equal(200);
    }));
  });

  describe('delete transaction', () => {
    it('should delete specified transaction', mochaAsync(async () => {
      // create transaction
      const txn = await testUser.createTransaction('5c1013558b76a20067e70f6a', {
        to: {
          type: 'DEPOSIT-US',
          id: '5c1012086a294e00611bc803'
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
      const response = await testUser.deleteTransaction('5c1013558b76a20067e70f6a', txn.data._id);
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch comment on status', () => {
    it('should comment on transaction status', mochaAsync(async () => {
      // create transaction
      const txn = await testUser.createTransaction('5c1013558b76a20067e70f6a', {
        to: {
          type: 'DEPOSIT-US',
          id: '5c1012086a294e00611bc803'
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
      const response = await testUser.commentOnStatus('5c1013558b76a20067e70f6a', txn.data._id, {
        comment: 'my comment'
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch dispute card transaction', () => {
    it('should submit dispute of card transaction', mochaAsync(async () => {
      const response = await testUser.disputeCardTransaction('5c10366058b87200631010f4', '5c1440497bedaa008a4a316a');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all subnets', () => {
    it('should retrieve all user subnets', mochaAsync(async () => {
      const response = await testUser.getAllSubnets('5c1012086a294e00611bc803');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get subnet w/ subnetID', () => {
    it('should retrieve specified subnet', mochaAsync(async () => {
      const response = await testUser.getSubnet('5c1012086a294e00611bc803', '5c10569f1ce2a6002b08a117');
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create subnet', () => {
    it('should create subnet', mochaAsync(async () => {
      const response = await testUser.createSubnet('5c1012086a294e00611bc803', {
        nickname: 'Test Subnet'
      });
      expect(response.status).to.equal(200);
    }));
  });

  // UPDATE SUBNET TEST PLACEHOLDER

  describe('register new fingerprint', () => {
    it('should submit new fingerprint', mochaAsync(async () => {
      const response = await testUser.registerNewFingerprint('newTestFingerprint123');
      expect(response.status).to.equal(202);
    }));

    it('should submit 2fa device', mochaAsync(async () => {
      const response = await testUser.supplyDevice2FA('newTestFingerprint123', 'easak@synapsefi.com');
      expect(response.status).to.equal(202);
    }));
  });

  describe('verify fingerprint 2fa', () => {
    it('should verify fingerprint 2fa', mochaAsync(async () => {
      const response = await testUser.verifyFingerprint2FA('newTestFingerprint123', '321965');
      expect(response.status).to.equal(200);
    }));
  });
});
