// @ts-nocheck

const expect = require('chai').expect;
import { Helpers } from './demo.data';

const runAsync = fn => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
}

describe('User Object', () => {
  let demoUser;

  beforeEach(async () => {
    demoUser = await Helpers.client.getUser('5da63bc4321f48759717159d');

  });



  describe('patch update user', () => {

    it('should update user', runAsync(async () => {
      const response = await demoUser.updateUser({
        update: {
          cip_tag: 1
        }
      });
      expect(response.status).to.equal(200);
    }));
  });

  describe('post create node', () => {
    it('should create node', runAsync(async () => {
      const response = await demoUser.createNode({
        type: 'DEPOSIT-US',
        info: {
          nickname: 'My Demo Checking'
        }
      }).catch((error)=>{ console.log({error})});

      console.log("RESPONSE", response.data.error);
      expect(response.status).to.equal(200);
    }));
  });

  describe('post ach-us mfa', () => {
    it('should verify bank login mfa', runAsync(async () => {
      // create ach-us node w/ bank logins
      const achNode = await demoUser.createNode({
        type: 'ACH-US',
        info: {
          bank_id: 'synapse_good',
          bank_pw: 'test1234',
          bank_name: 'fake'
        }
      });
      expect(achNode.status).to.equal(202);
      // verify bank login mfa
      const response = await demoUser.verifyAchMfa(
        achNode.data.mfa.access_token,
        'test_answer'
      );
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all user nodes', () => {
    it('should return all nodes for a user', runAsync(async () => {
      const response = await demoUser.getAllUserNodes();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get node w/ nodeID', () => {
    it('should return specified node', runAsync(async () => {
      const response = await demoUser.getNode('632de845cefdaa99a93bf0db');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all user transactions', () => {
    it('should return all transactions for a user', runAsync(async () => {
      const response = await demoUser.getUserTransactions();
      expect(response.status).to.equal(200);
    }));
  });

  describe('get trigger dummy transactions', () => {
    it('should trigger dummy transactions', runAsync(async () => {
      const response = await demoUser.triggerDummyTransactions('632de845cefdaa99a93bf0db');
      expect(response.status).to.equal(200);
    }));

    it('should trigger dummy transaction with amount', runAsync(async () => {
      const response = await demoUser.triggerDummyTransactions('632de845cefdaa99a93bf0db', {amount: '100'});
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch generate ubo form', () => {
    it('should generate new ubo form', runAsync(async () => {
      const user = await Helpers.client.getUser('5da63bc4321f48759717159d');
      const response = await user.generateUboForm({
        signer: {
          document_id: 'cb9504c5a5be07b7e00617bb9f358f19575960fcb5c6c90f4d845117c97ef7d5',
          relationship_to_entity: 'CEO'
        },
        entity_info: {
          document_id: 'cb9504c5a5be07b7e00617bb9f358f19575960fcb5c6c90f4d845117c97ef7d5',
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
          document_id: 'cb9504c5a5be07b7e00617bb9f358f19575960fcb5c6c90f4d845117c97ef7d5',
          relationship_to_entity: 'CEO'
        },
        compliance_contact: {
          document_id: 'cb9504c5a5be07b7e00617bb9f358f19575960fcb5c6c90f4d845117c97ef7d5',
          relationship_to_entity: 'CEO'
        },
        owners: [
          {
          document_id: 'cb9504c5a5be07b7e00617bb9f358f19575960fcb5c6c90f4d845117c97ef7d5',
          title: 'CEO',
          ownership: 95
          }
        ]
      });
      expect(response.status).to.equal(200);
    }));
  });

  // describe('get statements by user', () => {
  //   it('should retrieve statements by specified user', runAsync(async () => {
  //     const response = await demoUser.getStatementsByUser();
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  describe('get statements by node', () => {
    it('should retrive statements by specified node', runAsync(async () => {
      const response = await demoUser.getStatementsByNode('5dae4bfc75224d8215fbc1a8');
      expect(response.status).to.equal(200);
    }));
  });

  // describe('patch ship debit card', () => {
  //   it('should ship debit card', runAsync(async () => {
  //     const response = await demoUser.shipCardNode('5dae4bfc75224d8215fbc1a8', {
  //       fee_node_id: '<FEE_NODE_ID>'
  //     });
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  // describe('patch reset debit card', () => {
  //   it('should reset debit card', runAsync(async () => {
  //     const response = await demoUser.resetCardNode('5dae4bfc75224d8215fbc1a8');
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  // describe('patch verify micro-deposits', () => {
  //   it('should verify micro-deposits', runAsync(async () => {
  //     // create ach-us node w/ ac/rt
  //     const achNode = await demoUser.createNode({
  //       type: 'ACH-US',
  //       info: {
  //         nickname: 'Demo Account',
  //         account_num: '1232225674134',
  //         routing_num: '051000017',
  //         type: 'PERSONAL',
  //         class: 'CHECKING'
  //       }
  //     });
  //     expect(achNode.status).to.equal(200);
  //     // verify micro-deposits
  //     const response = await demoUser.verifyMicroDeposits(achNode.data.nodes[0]._id, {
  //       micro: [0.1, 0.1]
  //     });
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  describe('patch reinitiate micro-deposits', () => {
    it('should reinitiate microdeposits', runAsync(async () => {
      const response = await demoUser.reinitiateMicroDeposits('5dae4bfc75224d8215fbc1a8');
      expect(response.status).to.equal(200);
    }));
  });

  describe('patch update node', () => {
    it('should update node', runAsync(async () => {
      const response = await demoUser.updateNode('5dae4bfc75224d8215fbc1a8', {
        nickname: 'New Nickname'
      });
      expect(response.status).to.equal(200);
    }));
  });


  // describe('patch generate apple pay token', () => {
  //   it('should generate new apple pay token', runAsync(async () => {
  //     const response = await demoUser.generateApplePayToken('5dae4bfc75224d8215fbc1a8', {
  //       certificate: 'your applepay cert',
  //       nonce: '9c02xxx2',
  //       nonce_signature: '4082f883ae62d0700c283e225ee9d286713ef74'
  //     });
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  describe('post create transaction', () => {
    it('should create new transaction', runAsync(async () => {
      const response = await demoUser.createTransaction('5dae4bfc75224d8215fbc1a8', {
        to: {
          type: 'DEPOSIT-US',
          id: '62016b521c776f5af351111f'
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
    it('should retrive specified transaction', runAsync(async () => {
      const response = await demoUser.getTransaction('62016b521c776f5af351111f', '631dbfea9581b616524f5be3');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get all node transactions', () => {
    it('should retrive all node transaction', runAsync(async () => {
      const response = await demoUser.getAllNodeTransactions('62016b521c776f5af351111f');
      expect(response.status).to.equal(200);
    }));
  });



  describe('patch comment on status', () => {
    it('should comment on transaction status', runAsync(async () => {
      // create transaction
      const txn = await demoUser.createTransaction('62016b521c776f5af351111f', {
        to: {
          type: 'DEPOSIT-US',
          id: '5dae4bfc75224d8215fbc1a8'
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
      const response = await demoUser.commentOnStatus('5dae4bfc75224d8215fbc1a8', txn.data._id, {
        comment: 'my comment'
      });
      expect(response.status).to.equal(200);
    }));
  });

  // describe('patch dispute card transaction', () => {
  //   it('should submit dispute of card transaction', runAsync(async () => {
  //     const response = await demoUser.disputeCardTransaction('5dae4bfc75224d8215fbc1a8', '631dbfea9581b616524f5be3');
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  describe('get all subnets', () => {
    it('should retrieve all user subnets', runAsync(async () => {
      const response = await demoUser.getAllSubnets('5dae4bfc75224d8215fbc1a8');
      expect(response.status).to.equal(200);
    }));
  });

  describe('get subnet w/ subnetID', () => {
    it('should retrieve specified subnet', runAsync(async () => {
      const response = await demoUser.getSubnet('5dae4bfc75224d8215fbc1a8', '5daf7eb8ae18216fea09f675');
      expect(response.status).to.equal(200);
    }));
  });

  // describe('post create subnet', () => {
  //   it('should create subnet', runAsync(async () => {
  //     const response = await demoUser.createSubnet('5dae4bfc75224d8215fbc1a8', {
  //       nickname: 'Demo Subnet'
  //     });
  //     expect(response.status).to.equal(200);
  //   }));
  // });

  // describe('register new fingerprint', () => {
  //   it('should submit new fingerprint', runAsync(async () => {
  //     const response = await demoUser.registerNewFingerprint('newTestFingerprint123');
  //     expect(response.status).to.equal(202);
  //   }));

  //   it('should submit 2fa device', runAsync(async () => {
  //     const response = await demoUser.supplyDevice2FA('newTestFingerprint123', '<2FA_DEVICE>');
  //     expect(response.status).to.equal(202);
  //   }));
  // });

  // describe('verify fingerprint 2fa', () => {
  //   it('should verify fingerprint 2fa', runAsync(async () => {
  //     const response = await demoUser.verifyFingerprint2FA('newTestFingerprint123', '<2FA_CODE>');
  //     expect(response.status).to.equal(200);
  //   }));
  // });
});
