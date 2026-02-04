import jwt from "jsonwebtoken";
let token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET);
import dotenv from "dotenv";
// token 생성 = jwt 서명을 한 것 (페이로드, 나만의 암호키) + SHA256

console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NzAxMzc2NzR9.Ham8UjzEsnXU0C5KGfMQKWm7hPHVsR6KbDdutVSf3TA

// 검증
// 만약, 검증에 성공하면 payload 값을 확인할 수 있음!
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
// { foo: 'bar', iat: 1770138014 }
