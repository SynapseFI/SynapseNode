export interface ITransactionDetailsObject {
  amount: {
    currency: string;
    amount: number;
  };
  client: {
    id: string;
    name: string;
  };
  extra: ITransExtraObject;
  fees: { fee: number; note: string; to: { id: string } }[];
  recent_status: number;
  timeline: ITransactionTimelineObject[];
  from: ITransToFromObj;
  to: ITransToFromObj;
  _id: string;
  _v: number;
}

export interface IGetTransactionsApiResponse {
  error_code: string;
  http_code: string;
  limit: number;
  page: number;
  page_count: number;
  success: boolean;
  trans: ITransactionDetailsObject[];
  trans_count: number;
};

export interface ITransactionTimelineObject {
  date: string;
  note: string;
  status: string;
  status_id: string;
}

export interface ITransToFromObj {
  id: null | string;
  meta?: ITransMetaObj;
  nickname: string;
  type: string;
  user: {
    _id: string;
    legal_names: string[];
  }
}

/**
 * @note THIS IS NOT COMPREHENSIVE - there are values here not present in the docs and values in the docs not present here
 * {@link [docs](https://docs.synapsefi.com/api-references/transactions/transaction-object-details#interchange-meta-fields)}
 */
export interface ITransMetaObj {
  account_num: string;
  amount: string;
  acquirer_reference_number: string | null;
  address: {
    city: string;
    country: string;
    state: string;
    street: string;
    zipcode: string;
  },
  approval_code: string;
  back_signiture: boolean;
  card_acceptor_id: string;
  check_back: string;
  check_front: string;
  check_number: string;
  check_quality_bucket_num: string;
  condition_code: null;
  conversion_meta: {
    settlement_currency: string;
    transaction_currency: string;
    settlement_currency_conversion_rate: number;
  },
  enriched_info: {
    category: string;
    entity_id: string;
    facilitator_id: string;
    location_id: string;
    status: string;
  },
  fees: { amount: number; type: string }[];
  foreign_transaction: boolean;
  front_signature: string;
  fraud_score: {
    reason: string;
    score: number;
  },
  is_check: boolean;
  is_endorsed: boolean;
  is_force_post: boolean;
  is_recurring: boolean;
  mcc: string;
  merchant_category: string;
  merchant_id: string;
  merchant_logo: string;
  merchant_name: string;
  merchant_official_page: string;
  merchant_phone_number: string;
  merchant_subcategory: string;
  mid: string;
  name: string;
  original_check_back: string;
  original_check_front: string;
  pan_entry_mode: string;
  partial_approval_allowed: boolean;
  pin_entry_mode: string; 
  presentment_info: {
    card_presence: string;
    cardholder_presence: string;
    security_concern: string;
    type: string;
  },
  rebates: { amount: number; type: string }[];
  retrieval_reference_number: string,
  revenues: ITransMetaRevenuesObj[];
  routing_number: string,
  sub_amounts: {amount: number; type: string }[];
  subnet_id: string;
  srn_type: string;
  srn_address: string;
  system_trace_audit_number: string;
  terminal_id: string;
  terminal_info: {
    attendance: string;
    card_input_capability: string;
    card_retention_capability: string;
    location: string;
    operator: string;
    type: string;
  },
  type: string;
}

export interface ITransMetaRevenuesObj {
  amount: number;
  type: string;
  meta: {
    program: string;
    cap: number;
    fixed_rate: number;
    variable_rate: number;
    daily_adjusted_rate: number;
    unadjusted_value: number;
  }
}

/**
 * Synapse has an enrich endpoint that can return additional information about a merchant etc
 * {@link [docs](https://docs.synapsefi.com/api-references/miscellaneous/enrichment-guide)}
 */
export interface IEnrichmentObj {
  _id: string;
  address: {
    city: string;
    country_code: string;
    loc: number[];
    postal_code: string;
    street1: string;
    street2: string;
    subdivision: string;
  },
  analytics: unknown;
  logo: string;
  name: string;
  official_page: string;
  phone_number: {
    country_code: string;
    national_number: string;
  },
  scope: string;
}

export interface ITransExtraObject {
  created_on: number;
  asset: String;
  rate: number;
  rate_limit: number;
  supp_id: string;
  group_id: string;
  note: string;
  encrypted_note: string;
  process_on: number;
  settlement_delay: number;
  tracking_number: string;
  same_day: boolean;
  speed: string;
  other: {
    attachments: string[];
    chargeback_disputed: boolean;
    dispute_meta: any;
    is_provisional_credit: boolean;
    parent_transaction_id: string;
  }
  txp_meta: any;
  interchange_meta: any;
}

export interface IDisputeTransactionPayload {
  /**
   * required dispute reason: INCORRECT_AMOUNT
   */
  amount_debited: number;
  /**
   * required dispute reason: INCORRECT_AMOUNT|ATM
   */
  amount_received: number;
  /**
   * required dispute reason: UNAUTHORIZED|CARD_LOST
   */
  lost_date: number;
  /**
   * required dispute reason: UNAUTHORIZED|CARD_LOST
   */
  how_lost: string;
  /**
   * required dispute reason: UNAUTHORIZED|CARD_IN_HAND|SHARED, UNAUTHORIZED|CARD_IN_HAND|NOT_SHARED
   */
  last_use: string;
  /**
   * required dispute reason: UNAUTHORIZED|CARD_IN_HAND|SHARED
   */
  people_allowed_use: string;
  /**
   * required dispute reason: CANCEL_RECURRING_PMT
   */
  contact_date: number;
  /**
   * required dispute reason: CANCEL_RECURRING_PMT
   */
  contact_method: string;
  /**
   * required dispute reason: CHARGED_TWICE|CREDIT_NOT_PROCESSED|DUPLICATE, CHARGED_TWICE|CREDIT_NOT_PROCESSED|PAID_BY_OTHER_MEANS
   */
  trans_on_same_card: boolean;
  /**
   * required dispute reason: CHARGED_TWICE|CREDIT_NOT_PROCESSED|DUPLICATE, CHARGED_TWICE|CREDIT_NOT_PROCESSED|PAID_BY_OTHER_MEANS
   */
  merch_given_attempt_to_resolve: boolean;
  /**
   * required dispute reason: CANCEL_RECURRING_PMT
   */
  contact_name: string;
  /**
   * required dispute reason: CANCEL_RECURRING_PMT
   */
  contact_response: string;
}

export interface IDisputeChargebackPayload {
  /**
   * required: Array of supporting docs converted into base 64 encoded strings
   */
  docs: string[]
}