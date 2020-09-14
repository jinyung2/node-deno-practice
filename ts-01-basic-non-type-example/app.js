"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
// the exclamation tells typescript not to take the possible null value
const buttonElement = document.querySelector('button');
const numResult = [];
const stringResult = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    else {
        return +num1 + +num2;
    }
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener('click', () => {
    const result = add(+num1Element.value, +num2Element.value);
    numResult.push(result);
    stringResult.push('1');
    printResult({ val: result, timestamp: new Date() });
    console.log(numResult, stringResult);
});
// console.log(add('1', '6'));
const myPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res('it worked');
    }, 1000);
});
myPromise.then(result => {
    console.log(result);
});
