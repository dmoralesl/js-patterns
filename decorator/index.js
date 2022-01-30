const convertArticleCurrency = require('./decorator');
class Article {
    constructor(title, price, currency) {
        this.title = title;
        this.price = price;
        this.currency = currency;
    }

    getInfo() {
        return `${this.title} costs ${this.price} ${this.currency}`;
    }
}

const article1 = new Article('Comic', 10, 'USD');
const article2 = new Article('Smarpthone', 28, 'GBP');
const article3 = new Article('House', 15000000, 'CNY');

console.log(article1.getInfo());
const article1Converted = convertArticleCurrency(article1);
console.log(article1Converted.getInfo());

console.log('\n\n');

console.log(article2.getInfo());
const article2Converted = convertArticleCurrency(article2);
console.log(article2Converted.getInfo());

console.log('\n\n');

console.log(article3.getInfo());
const article3Converted = convertArticleCurrency(article3);
console.log(article3Converted.getInfo());

