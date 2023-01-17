export interface IQueryParams {
    amount?: number;
    query?: string;
    page?: number;
    per_page?: number;
    filter?: string;
    show_refresh_tokens?: string;
    full_dehydrate?: string;
    force_refresh?: string;
    type?: string;
    zip?: string;
    lat?: string | number;
    lon?: string | number;
    radius?: string | number;
    limit?: number;
    currency?: string;
    foreign_transaction?: string;
    is_credit?: string;
    subnet_id?: string;
    ticker?: string;
    routing_num?: string;
    address_city?: string;
    address_country_code?: string;
    address_postal_code?: string;
    address_street?: string;
    address_subdivision?: string;
}
export interface IBuildQueryParamsArgs extends IQueryParams {
    originalUrl: string;
}
export interface IHeadersValues {
    client_id: string;
    client_secret: string;
    fingerprint: string;
    ip_address: string;
    oauth_key: string;
    idempotency_key?: string;
}
export interface IHeadersObject {
    'X-SP-USER-IP': string;
    'Content-Type': string;
    'X-SP-GATEWAY'?: string;
    'X-SP-USER'?: string;
    'X-SP-IDEMPOTENCY-KEY'?: string;
    [index: string]: string | undefined;
}
export interface IHeadersOptions {
    fingerprint?: string;
    ip_address?: string;
    full_dehydrate?: string;
    idempotency_key?: string;
}
export interface IVerifiedRoutingNum {
    address: string;
    bank_code: string;
    bank_name: string;
    horizontal_logo: string;
    logo: string;
    meta: {
        primary_color: string;
        secondary_color: string;
    };
    name: string;
    url: string;
}
export interface IDeliverabilityObject {
    deliverability: string;
    deliverability_analysis: {
        partial_valid: boolean;
        primary_number_invalid: boolean;
        primary_number_missing: boolean;
        secondary_invalid: boolean;
        secondary_missing: boolean;
    };
    normalized_address: {
        address_city: string;
        address_country_code: string;
        address_postal_code: string;
        address_street: string;
        address_subdivision: string;
    };
}
export interface IGetAtmLocationsResponse {
    atms: IAtmLocationObject[];
    atms_count: number;
    error_code: string;
    http_code: string;
    limit: number;
    page: number;
    page_count: number;
    "success": boolean;
}
export interface IAtmLocationObject {
    atmLocation: {
        DistanceMeters: string;
        DistanceUnit: string;
        ImageURL: string;
        LocationID: string;
        LocationName: string;
        LocationType: string;
        LocationTypeLabel: string;
        MapIcon: string;
        MapUrl: string;
        SurchargeFree: string;
        address: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
        };
        coordinates: {
            latitude: string;
            longitude: string;
        };
    };
    atm_network_type: string;
    distance: number;
}
