import { AxiosRequestConfig } from 'axios';
import { IHeadersObject, IHeadersValues } from '../interfaces/helpers';
declare const buildHeaders: ({ client_id, client_secret, oauth_key, fingerprint, ip_address, idempotency_key, }: Partial<IHeadersValues>) => IHeadersObject;
export declare const makePostPatchConfig: (headers: IHeadersObject) => Partial<AxiosRequestConfig>;
export default buildHeaders;
