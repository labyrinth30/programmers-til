/**
 * 배열
 */
const arr = [1, 2, 3, 4, 5];

// 객체 혹은 배열에서 요소를 하나 꺼낸 다음 불리는 콜백 함수
// 첫 번째 인자는 value, 두 번째는 index
arr.forEach(function(item) {
    return item * 2;
});
