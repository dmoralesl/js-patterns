const fs = require('fs');


function getCurrencyConversion() {
  return JSON.parse(fs.readFileSync('./decorator/currency_conversions.json', 'utf8'));
}

function convertArticleCurrency(article) {
  const currenciesConversion = getCurrencyConversion();
  const keyCurrencyConversion = `${article.currency}_EUR`;
  if (!Object.keys(currenciesConversion).includes(keyCurrencyConversion)) {
    throw new Error(`Currency conversion ${keyCurrencyConversion} not found`);
  }
  const currencyFactor = currenciesConversion[keyCurrencyConversion];
  article.price = Math.round(article.price * currencyFactor);
  article.currency = 'EUR';

  return article;
}

module.exports = convertArticleCurrency;