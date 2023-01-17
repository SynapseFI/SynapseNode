export interface IGetSubscriptionsApiResponse {
    error_code: string;
    http_code: string;
    limit: number;
    page: number;
    page_count: number;
    subscriptions_count: number;
    subscriptions: ISubscriptionObject[];
    success: boolean;
}
export interface ISubscriptionObject {
    _id: string;
    _links: {
        self: {
            href: string;
        };
    };
    _v: number;
    client_id: string;
    is_active: boolean;
    scope: TSubscriptionScope[];
    url: string;
}
export type TSubscriptionScope = "USERS|POST" | "USER|PATCH" | "USERS|PATCH" | "NODES|POST" | "NODE|PATCH" | "NODES|PATCH" | "NODE|DELETE" | "NODES|DELETE" | "TRANS|POST" | "TRANS|POST|JIT" | "TRAN|PATCH" | "TRANS|PATCH" | "TRAN|DELETE" | "TRANS|DELETE" | "SUBNETS|POST" | "SUBNET|PATCH";
