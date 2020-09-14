const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// the exclamation tells typescript not to take the possible null value
const buttonElement = document.querySelector('button')!;

const numResult: number[] = [];
const stringResult: string[] = [];

type NumOrStr = number | string;

function add(num1: NumOrStr, num2: NumOrStr) {
  if (typeof num1 === 'number' && typeof num2 === 'number'){
    return num1 + num2;
  }else if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1 + ' ' + num2;
  } else {
    return +num1 + +num2;
  }
}

function printResult(resultObj: { val: number, timestamp: Date }) {
  console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
  
  const result = add(+num1Element.value, +num2Element.value);
  numResult.push(result as number);
  stringResult.push('1');
  printResult({val: result as number, timestamp: new Date()});
  console.log(numResult, stringResult);
})
// console.log(add('1', '6'));

const myPromise = new Promise<string>((res, rej) => {
  setTimeout(() => {
    res('it worked');
  }, 1000);
});

myPromise.then(result => {
  console.log(result.split('w'));
})