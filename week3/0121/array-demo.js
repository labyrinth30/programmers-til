// JS 배열의 비구조화

const array = [1, 2, 3, 4, 5];

const [a, b, c, d, e] = array;
console.log(a, b, c, d, e);

const Arr = [1,2,3,4,5];
let [index1, index2, , ...rest] = Arr;

console.log(index1); // 첫 번째 요소 가져오기 // 1
console.log(index2); // 두 번째 요소 가져오기 // 2
console.log(rest); // 네 번째, 다섯 번째 요소 가져오기 //[4,5]