let db = new Map();

db.set(1, 'John'); // key로 value를 찾을 수 있는 한 쌍
db.set(2, 'Peter');
db.set(3, 'Amy');

console.log(db);
console.log(db.get(2));
db.set(2, 'Jack');
console.log(db.get(2));