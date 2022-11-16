import Client from "../lib/Client";

export let initClientObject = {
  client_id: 'client_id_QRtPbYMHNiLho603gF9uGcDWmj7Upva52IAyEfle',
  client_secret: 'client_secret_QCOoA2a5FyiLUtGKJu8vzX14DjNV7Ee9b0BlnSwk',
  fingerprint: '0347b64bb332a9d688057acb1a6b2b57',
  ip_address: '108.235.114.35',
  isProduction: false,
}


export const Helpers = {
  client: new Client(initClientObject)
};


