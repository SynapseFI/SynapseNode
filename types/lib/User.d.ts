export = User;
declare class User {
    constructor({ data, headerObj, client }: {
        data: any;
        headerObj: any;
        client: any;
    });
    id: any;
    body: any;
    host: any;
    fingerprint: any;
    ip_address: any;
    oauth_key: string;
    client: any;
    headers: {
        'Content-Type': string;
        'X-SP-USER-IP': any;
    };
    addUserKyc(bodyParams?: {}): any;
    deleteExistingDocument(bodyParams?: {}): any;
    updateUser(bodyParams?: {}): any;
    /**
     * GET ALL USER DUPLICATES
     *
     * @returns Promise
     *
     * [Get User Duplicates Docs]{@link https://docs.synapsefi.com/api-references/users/manage-duplicates#example-request}
     */
    getUserDuplicates(): any;
    /**
     * SWAP DUPLICATE USER
     * @param {String} swap_to_user_id required: User ID you'd like to swap the open status with
     *
     * @returns Promise
     *
     * [Swap Duplicate User Docs]{@link https://docs.synapsefi.com/api-references/users/manage-duplicates#example-request-1}
     */
    swapDuplicateUsers(swap_to_user_id: string): any;
    _grabRefreshToken(): any;
    _oauthUser(bodyParams?: {}): any;
    createNode(bodyParams?: {}, idempotency_key?: null): any;
    verifyAchMfa(access_token: any, mfa_answer: any, idempotency_key?: null): any;
    getAllUserNodes(queryParams?: {}): any;
    getNode(node_id: any, queryParams?: {}): any;
    getUserTransactions(queryParams?: {}): any;
    triggerDummyTransactions(node_id: any, queryParams?: {}): any;
    generateUboForm(bodyParams: any): any;
    getStatementsByUser(queryParams?: {}): any;
    getStatementsByNode(node_id: any, queryParams?: {}): any;
    shipCardNode(node_id: any, bodyParams: any): any;
    resetCardNode(node_id: any): any;
    verifyMicroDeposits(node_id: any, bodyParams: any): any;
    reinitiateMicroDeposits(node_id: any): any;
    updateNode(node_id: any, bodyParams: any): any;
    deleteNode(node_id: any): any;
    generateApplePayToken(node_id: any, bodyParams: any): any;
    createTransaction(node_id: any, bodyParams: any, idempotency_key?: null): any;
    /**
     *
     * @param {String} node_id required: id of node on which to create bulk transactions
     * @param {Object} bodyParams required: body of post request, must have transactions key, which is an array of transaction objects
     * @param {Array} bodyParams.transactions
     *
     * @returns Promise
     *
     * Idempotency keys can be provided for each transaction, inside each transaction object's `extra` key.
     *
     * e.g. `{ transactions: [{ extra: { idempotency_key: 'idemPotKeyStr' } }] }`
     *
     * [Batch Transaction Docs]{@link https://docs.synapsefi.com/api-references/transactions/create-batch-transactions}
     * [Trans Object Details]{@link https://docs.synapsefi.com/api-references/transactions/transaction-object-details}
     */
    createBatchTransactions(node_id: string, bodyParams: {
        transactions: any[];
    }): any;
    getTransaction(node_id: any, trans_id: any): any;
    getAllNodeTransactions(node_id: any, queryParams?: {}): any;
    deleteTransaction(node_id: any, trans_id: any): any;
    commentOnStatus(node_id: any, trans_id: any, bodyParams: any): any;
    disputeCardTransaction(node_id: any, trans_id: any, bodyParams: any): any;
    getAllSubnets(node_id: any, queryParams?: {}): any;
    getSubnet(node_id: any, subnet_id: any, queryParams?: {}): any;
    createSubnet(node_id: any, bodyParams: any, idempotency_key?: null): any;
    updateSubnet(node_id: any, subnet_id: any, bodyParams?: {}): any;
    pushToMobileWallet(node_id: any, subnet_id: any, bodyParams?: {}): any;
    shipCard(node_id: any, subnet_id: any, bodyParams?: {}): any;
    /**
     * GET ALL CARD SHIPMENTS
     * @param {String} node_id required: id of node belonging to the subnet
     * @param {String} subnet_id required: id of card subnet for the card shipments
     * @param {Object} queryParams optional: body of post request, can contain page and per_page keys indicating the amount of card shipments returned
     *
     * @returns Promise
     *
     *
     * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/view-all-subnet-shipments}
     */
    getAllCardShipments(node_id: string, subnet_id: string, queryParams?: any): any;
    /**
     * GET A SINGLE CARD SHIPMENT
     * @param {String} node_id required: id of node belonging to the subnet
     * @param {String} subnet_id required: id of card subnet for the card shipments
     * @param {Object} shipment_id requred: id of card shipment
     *
     * @returns Promise
     *
     *
     * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/view-shipment}
     */
    getCardShipment(node_id: string, subnet_id: string, shipment_id: any): any;
    /**
     * DELETE A SINGLE CARD SHIPMENT
     * @param {String} node_id required: id of node belonging to the subnet
     * @param {String} subnet_id required: id of card subnet for the card shipments
     * @param {Object} shipment_id requred: id of card shipment
     *
     * @returns Promise
     *
     *
     * [Get Card Shipment Docs]{@link https://docs.synapsefi.com/api-references/shipments/cancel-shipment}
     */
    deleteCardShipment(node_id: string, subnet_id: string, shipment_id: any): any;
    registerNewFingerprint(fp: any): Promise<any>;
    supplyDevice2FA(fp: any, device: any): Promise<any>;
    verifyFingerprint2FA(fp: any, validation_pin: any): Promise<any>;
    updateIpAddress(ip: any): {
        'Content-Type': string;
        'X-SP-USER-IP': any;
    };
}
