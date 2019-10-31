const _ = require('lodash');

module.exports.addQueryParams = ({
  originalUrl,
  amount,
  query,
  page,
  per_page,
  show_refresh_tokens,
  full_dehydrate,
  force_refresh,
  type,
  zip,
  lat,
  lon,
  radius,
  limit,
  currency,
  foreign_transaction,
  is_credit,
  subnet_id,
  ticker
}) => {
  const params = [];

  if (query !== undefined) {
    params.push(`query=${query}`);
  }
  if (amount !== undefined) {
    params.push(`amount=${amount}`);
  }
  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (per_page !== undefined) {
    params.push(`per_page=${per_page}`);
  }
  if (show_refresh_tokens !== undefined) {
    params.push(`show_refresh_tokens=${show_refresh_tokens}`);
  }
  if (full_dehydrate !== undefined) {
    params.push(`full_dehydrate=${full_dehydrate}`);
  }
  if (force_refresh !== undefined) {
    params.push(`force_refresh=${force_refresh}`);
  }
  if (type !== undefined) {
    params.push(`type=${type}`);
  }
  if (zip !== undefined) {
    params.push(`zip=${zip}`);
  }
  if (lat !== undefined) {
    params.push(`lat=${lat}`);
  }
  if (lon !== undefined) {
    params.push(`lon=${lon}`);
  }
  if (radius !== undefined) {
    params.push(`radius=${radius}`);
  }
  if (limit !== undefined) {
    params.push(`limit=${limit}`);
  }
  if (currency !== undefined) {
    params.push(`currency=${currency}`);
  }
  if (foreign_transaction !== undefined) {
    params.push(`foreign_transaction=${foreign_transaction}`);
  }
  if (is_credit !== undefined) {
    params.push(`is_credit=${is_credit}`);
  }
  if (subnet_id !== undefined) {
    params.push(`subnetid=${subnet_id}`);
  }
  if (ticker !== undefined) {
    params.push(`ticker=${ticker}`);
  }

  return params.length === 0 ? originalUrl : originalUrl += `?${params.join('&')}`;
};

module.exports.replacePathParams = ({
  originalUrl,
  user_id,
  node_id,
  trans_id,
  subnet_id
}) => {
  let copiedUrl = originalUrl;

  if (user_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':user_id', user_id);
  }
  if (node_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':node_id', node_id);
  }
  if (trans_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':trans_id', trans_id);
  }
  if (subnet_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':subnet_id', subnet_id);
  }

  return copiedUrl;
};