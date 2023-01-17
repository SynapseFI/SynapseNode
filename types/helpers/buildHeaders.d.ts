declare function _exports({ client_id, client_secret, oauth_key, fingerprint, ip_address, idempotency_key }: {
    client_id: any;
    client_secret: any;
    oauth_key: any;
    fingerprint: any;
    ip_address: any;
    idempotency_key: any;
}): {
    'Content-Type': string;
    'X-SP-USER-IP': any;
};
export = _exports;
