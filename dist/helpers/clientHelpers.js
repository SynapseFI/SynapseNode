const User = require('../lib/User');

module.exports.checkOptions = (headerObj, options) => {
  const copy = JSON.parse(JSON.stringify(headerObj));

  if (options.fingerprint) {
    copy.fingerprint = options.fingerprint;
  }
  if (options.ip_address) {
    copy.ip_address = options.ip_address;
  }
  if (options.full_dehydrate) {
    copy.full_dehydrate = options.full_dehydrate;
  }
  if (options.idempotency_key) {
    copy.idempotency_key = options.idempotency_key;
  }

  return copy;
};

module.exports.instantiateUser = async ({ data, headerObj, client }) => {
  const user = await new User({ data, headerObj, client });
  await user._oauthUser({ refresh_token: user.body.refresh_token });
  return user;
};