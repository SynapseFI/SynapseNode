import { IDeliverabilityObject, IGetAtmLocationsResponse, IHeadersObject, IHeadersOptions, IQueryParams, IVerifiedRoutingNum } from '../interfaces/helpers';
import { AxiosResponse } from 'axios';
import { IGetUsersResponse, IUserObject } from '../interfaces/user';
import User from './User';
import { IDisputeChargebackPayload, IGetTransactionsApiResponse } from '../interfaces/transaction';
import { IGetNodesApiResponse } from '../interfaces/node';
import { IGetSubscriptionsApiResponse, ISubscriptionObject } from '../interfaces/subscription';
declare class Client {
    client_id: string;
    client_secret: string;
    fingerprint: string;
    ip_address: string;
    host: string;
    isProduction: boolean;
    headers: IHeadersObject;
    _default_public_key_scopes: string[];
    _default_subscription_scopes: string[];
    constructor({ client_id, client_secret, fingerprint, ip_address, isProduction }: {
        client_id: any;
        client_secret: any;
        fingerprint: any;
        ip_address: any;
        isProduction: any;
    });
    /**
     * @description POST call to create a new user.
     * @param bodyParams payload with user details for create user call.
     * @param ip_address ip address of the user
     * @param options TODO
     * @returns newly created user object instantiated with SynapseNode library
     *
     * {@link [User Object Details](https://docs.synapsefi.com/api-references/users/user-object-details)}
     * {@link [Create User](https://docs.synapsefi.com/api-references/users/create-user)}
     */
    createUser(bodyParams: Partial<IUserObject>, ip_address: string, options?: IHeadersOptions | null): Promise<User>;
    /**
     * @description gets a list of users based on query passed.
     * @param queryParams parameters for GET call to fetch users
     * @returns list of users based on query passed.
     *
     * {@link [View All Users](https://docs.synapsefi.com/api-references/users/view-all-users-paginated)}
     */
    getAllUsers(queryParams?: IQueryParams): Promise<AxiosResponse<IGetUsersResponse>>;
    /**
     * @description fetches and instanties a user object based on the passed user primary key.
     * @param user_id primary key of the desired user to get
     * @param options TODO
     * @returns instantiated user object
     *
     * {@link [View User](https://docs.synapsefi.com/api-references/users/view-user)}
     */
    getUser(user_id: string, options?: {
        [index: string]: string;
    } | null): Promise<User>;
    /**
     * @description gest a list of transactions
     * @param queryParams parameters for GET call to fetch list of transactions
     * @returns list of transactions based on query passed
     */
    getPlatformTransactions(queryParams?: IQueryParams): Promise<AxiosResponse<IGetTransactionsApiResponse>>;
    /**
     * @description gest a list of nodes
     * @param queryParams parameters for GET call to fetch list of nodes
     * @returns list of nodes based on query passed
     */
    getPlatformNodes(queryParams?: IQueryParams): Promise<AxiosResponse<IGetNodesApiResponse>>;
    /**
     * @returns list of institutions
     */
    getInstitutions(): Promise<AxiosResponse<any>>;
    issuePublicKey(scope?: string[], userId?: string | null): Promise<AxiosResponse<any, any>>;
    /**
     *
     * @param subscriptionUrl url destination for webhooks
     * @param scope scopes on which to run the callback
     * @param idempotency_key optional idempotency in headers
     * @returns newly created
     *
     * {@link [Subscription Object Details](https://docs.synapsefi.com/api-references/subscriptions/create-subscription)}
     * {@link [Create Subscription](https://docs.synapsefi.com/api-references/subscriptions/create-subscription)}
     */
    createSubscription(subscriptionUrl: string, scope?: string[], idempotency_key?: string | null): Promise<AxiosResponse<any, any>>;
    /**
     * @description gets a list of all the subscriptions
     * @param queryParams Query params to view list of subsciptions
     * @returns list of subscriptions
     *
     * {@link [View All Subscriptions](https://docs.synapsefi.com/api-references/subscriptions/view-all-subscriptions)}
     */
    getAllSubscriptions(queryParams?: IQueryParams): Promise<AxiosResponse<IGetSubscriptionsApiResponse>>;
    /**
     * @description fetch a single subscription by ID
     * @param subscription_id primary key of subscription to fetch
     * @returns subscription object details
     */
    getSubscription(subscription_id: string): Promise<AxiosResponse<ISubscriptionObject>>;
    /**
     * @description patch call to update specified subscription
     * @param subscription_id primary key of subscription to update
     * @param bodyParams subscription properties to update
     * @returns updated scription object
     */
    updateSubscription(subscription_id: string, bodyParams?: Partial<ISubscriptionObject>): Promise<AxiosResponse<ISubscriptionObject>>;
    /**
     * @description view all atms
     * @param queryParams
     * @returns
     *
     * {@link [View ATMs](https://docs.synapsefi.com/api-references/nodes/view-atms)}
     */
    locateAtms(queryParams?: IQueryParams): Promise<AxiosResponse<IGetAtmLocationsResponse>>;
    /**
     *
     * @param bodyParams
     * @returns deliverability details object
     */
    verifyAddress(bodyParams?: any): Promise<AxiosResponse<IDeliverabilityObject>>;
    /**
     * @param bodyParams
     * @returns information about the verified routing number
     *
     * {@link [Verify Routing Number](https://docs.synapsefi.com/api-references/miscellaneous/verify-routing-number)}
     */
    verifyRoutingNumber(bodyParams?: {
        routing_num?: string;
        type?: string;
    }): Promise<AxiosResponse<IVerifiedRoutingNum>>;
    getCryptoQuotes(): Promise<AxiosResponse<any, any>>;
    getCryptoMarketData(queryParams?: IQueryParams): Promise<AxiosResponse<any, any>>;
    getWebhookLogs(): Promise<AxiosResponse<any, any>>;
    getTradeMarketData(queryParams?: IQueryParams): Promise<AxiosResponse<any, any>>;
    /**
     * @description Only INTERCHANGE-US transactions that have been RETURNED within the last 14 days with return code of IR999 can be disputed.
     * If dispute is won, the transaction will go back to SETTLED status. We recommend {@link [Subscribing to our webhooks](https://docs.synapsefi.com/api-references/subscriptions)} to be notified.
     * @param transId Unique ID for transaction
     * @param bodyParams Array of supporting docs converted into base 64 encoded strings
     */
    disputeChargeback(transId: string, bodyParams: IDisputeChargebackPayload): Promise<AxiosResponse<any, any>>;
    /**
     * @description {@link [Fetches allowed node types](https://docs.synapsefi.com/api-references/nodes/allowed-node-types)}
     * @returns list of allowed node types
     */
    getNodeTypes(): Promise<AxiosResponse<any, any>>;
    /**
     * @description {@link [Fetches allowed user document types](https://docs.synapsefi.com/api-references/users/allowed-document-types)}
     * @returns list of allowed user document types
     */
    getUserDocumentTypes(): Promise<AxiosResponse<any, any>>;
    /**
     * @description {@link [Fetches allowed user entity types](https://docs.synapsefi.com/api-references/users/allowed-entity-types)}
     * @returns list of allowed user entity types
     */
    getUserEntityTypes(): Promise<AxiosResponse<any, any>>;
    /**
     * @description {@link [Fetches allowed user entity scopes](https://docs.synapsefi.com/api-references/users/allowed-entity-scopes)}
     * @returns list of allowed user entity scopes
     */
    getUserEntityScopes(): Promise<AxiosResponse<any, any>>;
}
export default Client;
