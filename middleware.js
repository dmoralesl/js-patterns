const Middleware = require("./_middleware_class");

class Maths {
  add({a, b}) {
    return a + b;
  }
  subtract({a, b}) {
    return a - b;
  }
  multiply({a, b}) {
    return a * b;
  }
}

const calculator = new Maths();
const app = new Middleware(calculator);

app.use((req, next) => {
  console.log(`Square number. Initial values a->${req.a} and b->${req.b} `);
  req.a = req.a ** 2;
  req.b = req.b ** 2;
  console.log(`Result values to a->${req.a} and b->${req.b} `);
  next();
});

app.use((req, next) => {
  console.log(`Cube number. Initial values a->${req.a} and b->${req.b} `);
  req.a = req.a ** 3;
  req.b = req.b ** 3;
  console.log(`Result values to a->${req.a} and b->${req.b} `);
  next();
});

app.use((req, next) => {
  console.log(`Division 2. Initial values a->${req.a} and b->${req.b} `);
  req.a = req.a / 2;
  req.b = req.b / 2;
  console.log(`Result values to a->${req.a} and b->${req.b} `);
  next();
});

console.log('Calling add method of Math class');
console.log(`Final value -->${app.add({a: 5, b: 10})}`)
console.log('Calling substract method of Math class');
console.log(`Final value -->${app.subtract({a: 10, b: 6})}`)
console.log('Calling multiply method of Math Class');
console.log(`Final value -->${app.multiply({a: 2, b: 3})}`)
