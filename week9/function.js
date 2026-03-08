// 1. 즉시 실행 함수 : 정의되자마자 딱 한 번 바로 실행돼요.
(function iife() {
    console.log(1);
})();

// 2. 재귀 함수 : 자기 자신을 다시 호출해요. (탈출 조건이 꼭 필요해요)
function recursive(arg) {
    if (arg === 2) return arg;
    return recursive(++arg);
}
console.log(recursive(1));

// 3. 중첩 함수 : 함수 안에 함수를 선언해서 사용해요.
function outer(arg) {
    function inner() {
        console.log(arg);
    }
    inner();
}
outer(1);

// 4. 콜백 함수 : 다른 함수의 인자로 넘겨져서 나중에 실행돼요.
function testCb(arg) {
    arg();
}
testCb(() => {
    console.log(3);
});
