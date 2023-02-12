export const formatMoney = (amount = 0, currency = 'PHP') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter.format(amount);
};
