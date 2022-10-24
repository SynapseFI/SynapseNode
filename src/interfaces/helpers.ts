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
}
