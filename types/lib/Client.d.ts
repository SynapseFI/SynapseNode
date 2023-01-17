export = Client;
declare class Client {
    constructor({ client_id, client_secret, fingerprint, ip_address, isProduction }: {
        client_id: any;
        client_secret: any;
        fingerprint: any;
        ip_address: any;
        isProduction: any;
    });
    client_id: any;
    client_secret: any;
    fingerprint: any;
    ip_address: any;
    isProduction: any;
    host: string;
    headers: {
        'Content-Type': string;
        'X-SP-USER-IP': any;
    };
    createUser(bodyParams: any, ip_address: any, options?: null): Promise<User>;
    getAllUsers(queryParams?: {}): any;
    getUser(user_id: any, options?: null): Promise<User>;
    getPlatformTransactions(queryParams?: {}): any;
    getPlatformNodes(queryParams?: {}): any;
    getInstitutions(): any;
    issuePublicKey(scope?: string[], userId?: null): any;
    createSubscription(url: any, scope?: string[], idempotency_key?: null): any;
    getAllSubscriptions(queryParams?: {}): any;
    getSubscription(subscription_id: any): any;
    updateSubscription(subscription_id: any, bodyParams?: {}): any;
    locateAtms(queryParams?: {}): any;
    verifyAddress(queryParams?: {}): any;
    verifyRoutingNumber(queryParams?: {}): any;
    getCryptoQuotes(): any;
    getCryptoMarketData(queryParams?: {}): any;
    getWebhookLogs(): any;
    getTradeMarketData(queryParams?: {}): any;
}
import User = require("./User");
