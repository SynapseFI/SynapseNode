import { AxiosRequestConfig } from 'axios';
import { IHeadersObject, IHeadersValues } from '../interfaces/helpers';

const getHeaderGateway = ({ client_id, client_secret }: Partial<IHeadersValues>): string => {
  if (client_id && client_secret) return `${client_id}|${client_secret}`;
  if (client_id && !client_secret) return client_id;
  if (!client_id && client_secret) return `|${client_secret}`;
  return 'xxx|xxx';
};

const getHeaderUser = ({ oauth_key, fingerprint }: Partial<IHeadersValues>): string => {
  if (oauth_key && fingerprint) return `${oauth_key}|${fingerprint}`;
  if (oauth_key && !fingerprint) return oauth_key;
  if (!oauth_key && fingerprint) return `|${fingerprint}`;
  return 'xxx|xxx';
};

const buildHeaders = ({
  client_id,
  client_secret,
  oauth_key,
  fingerprint,
  ip_address,
  idempotency_key,
}: Partial<IHeadersValues>): IHeadersObject => {
  const headers: IHeadersObject = {
    'Content-Type': 'application/json',
    'X-SP-USER-IP': ip_address || '127.0.0.1',
  };

  if (client_id || client_secret) {
    headers['X-SP-GATEWAY'] = getHeaderGateway({ client_id, client_secret });
  }

  if (oauth_key || fingerprint) {
    headers['X-SP-USER'] = getHeaderUser({ oauth_key, fingerprint });
  }

  if (idempotency_key) {
    headers['X-SP-IDEMPOTENCY-KEY'] = idempotency_key;
  }

  return headers;
};

export const makePostPatchConfig = (
  headers: IHeadersObject
): Partial<AxiosRequestConfig> => {
  return {
    "headers": headers,
    "maxContentLength": 30 * 1048576,  // 30MiB is configured by the server.
    "maxBodyLength": 30 * 1048576
  };
}

export default buildHeaders;
