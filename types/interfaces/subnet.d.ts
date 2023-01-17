/**
 * {@link [Subnet Object Details](https://docs.synapsefi.com/api-references/subnets/subnet-object-details)}
 */
export interface ISubnetDetailsObject {
    _id: string;
    user_id: string;
    node_id: string;
    client: {
        id: string;
        name: string;
    };
    nickname: string;
    account_class: string;
    status: string;
    status_code: string;
    created_on: string;
    updated_on: string;
    supp_id: string;
    agreements: {
        type: string;
        url: string;
    };
    /**
     * Additional Values for Cards
     */
    card_number?: string;
    cvc?: string;
    pin?: string;
    exp?: string;
    card_style_id?: string;
    wallet_style_id?: string;
    preferences?: {
        allow_foreign_transactions?: boolean;
        daily_transaction_limit?: number | null;
        daily_cash_limit?: number | null;
        monthly_transaction_limit?: number | null;
        monthly_cash_limit?: number | null;
    };
    /**
     * Additional Values for Account Numbers
     */
    account_num?: string;
    routing_num?: {
        wire?: string;
        ach?: string;
    };
}
export interface IGetSubnetsApiResponse {
    error_code: string;
    http_code: string;
    limit: number;
    page: number;
    page_count: number;
    subnets: ISubnetDetailsObject[];
    subnets_count: number;
    success: boolean;
}
export interface IGetShipmentsApiResponse {
    error_code: string;
    http_code: string;
    limit: number;
    page: number;
    page_count: number;
    ships: IShipmentObject[];
    ship_count: number;
    success: boolean;
}
export interface IShipmentObject {
    _id: string;
    card_style_id: string;
    fee_node_id: string;
    name: string;
    secondary_label: string;
    address: {
        address_line_1: string;
        address_city: string;
        address_state: string;
        address_zipcode: string;
        address_country_code: string;
        address_care_of: string;
    };
    subnet_id: string;
    delivery: string;
    delivery_carrier: string;
    tracking: string;
    created_on: string;
    status: string;
}
