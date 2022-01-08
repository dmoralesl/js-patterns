const Printer = require('./decorator');

const yellowStyle = (printer) => {
    const decorator = copyObj(printer);

    decorator.print = (text, color) => {
        printer.print(text, '\x1b[33m%s\x1b[0m');
    }
    return decorator;

};

const cyanStyle = (printer) => {
    const decorator = copyObj(printer);

    decorator.print = (text, color) => {
        printer.print(text, '\x1b[36m%s\x1b[0m');
    }
    return decorator;

};

const copyObj = (originObj) => {
    const originPrototype = Object.getPrototypeOf(originObj);
    let newObj = Object.create(originPrototype);

    const originObjOwnProperties = Object.getOwnPropertyNames(originObj);
    originObjOwnProperties.forEach((property) => {
        const prototypeDesc = Object.getOwnPropertyDescriptor(originObj, property);
        Object.defineProperty(newObj, property, prototypeDesc);
    });

    return newObj;
}

const printerA = yellowStyle(new Printer());
printerA.print('Something in yellow color');
const printerB = cyanStyle(new Printer());
printerB.print('Another text in cyan color');
