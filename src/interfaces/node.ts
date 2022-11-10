export interface IGetNodesApiResponse {
  "error_code": string;
  "http_code": string;
  "limit": number;
  "page": number;
  "page_count": number;
  "success": boolean;
  "nodes": INodeDetailsObject[];
  "node_count": number;
};


// Node Detail
export interface INodeTimeline {
  date: number;
  note: string;
}

/**
 * {@link [Node Object Details](https://docs.synapsefi.com/api-references/nodes/node-object-details)}
 */
export interface INodeDetailsObject {
  _id: string;
  _links: object;
  allowed: string;
  allowed_status_code: string | null;
  client: object;
  extra: INodeDetailsExtra;
  info: INodeDetailsInfo;
  is_active: boolean;
  timeline: INodeTimeline[];
  type: string;
  user_id: string;
};

export interface INodeDetailsInfo {
  nickname: string;
  loan_type?: string;
  auto_pay?: boolean;
  payment_node_id?: string;
  reserve_node_id?: string;
  next_payment?: number;
  installment_amount?: number;
  credit_limit?: { amount: number; currency: string };
  agreements?: { type: string; url: string }[];
  deposit_addresses?: {
    BTC?: string;
    ETH?: string;
    [index: string]: string | undefined;
  };
  portfolio?: { BTC: number; ETH: number; DAI: number };
  balances?: { [index: string]: string | number };
  balance?: { amount: number; currency: string };
  bank_logo?: string;
  bank_hlogo?: string;
  bank_url?: string;
  bank_code?: string;
  bank_name?: string;
  bank_long_name?: string;
  account_num?: string;
  routing_num?: string;
  routing_number?: string;
  swift?: string;
  bsb_number?: string;
  clabe?: string;
  tax_number?: string;
  branch_name?: string;
  branch_code?: string;
  document_id?: string;
  card_hash?: string;
  card_number?: string;
  exp_date?: string;
  network?: string;
  type?: string;
  payee_name?: string;
  payee_address?: {
    address_street: string;
    address_city: string;
    address_subdivision: string;
    address_country_code: string;
    address_postal_code: string;
  };
  bank_address?: {
    address_street: string;
    address_city: string;
    address_subdivision: string;
    address_country_code: string;
    address_postal_code: string;
  };
  installments?: {
    amount: number;
    date: number;
  };
  interest?: {
    cap: number;
    apr: number;
    accrued: number;
  };
  correspondent_info?: {
    address: string;
    routing_num: string;
    bank_name: string;
  };
  match_info?: {
    email_match: string;
    phone_number_match: string;
    name_match: string;
  };
  biller_id?: string;
  custody?: string;
  risk?: string;
  monthly_withdrawals_remaining?: number;
  split_ratio?: number;
  schedule?: string;
  speeds?: string[];
  class?: string;
  [index: string]: unknown
}

export interface INodeDetailsExtra {
  other: INodeDetailsExtraOther;
};

export interface INodeDetailsExtraOther {
  access_token?: unknown;
  micro_meta?: INodeDetailsMicroMeta;
  updated_on?: unknown;
}

export interface INodeDetailsMicroMeta {
  micro_attempts: number;
  micro_sent_count: number;
  skip_micro: boolean;
}

/**
 * @todo fill this out with subnet details info
 */
export interface INodeDetailsSubnetInfo {
  _id: string;
  _links: object;
};
