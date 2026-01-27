import express from 'express';
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
app.use(express.json());

// DB
let db = new Map();
var id = 1;

// 로그인
app.post('/login', (req,res) => {
    const { email, password } = req.body;
    res.json()
});

// 회원가입
app.post('/register', (req,res) => {
    const { email, password, nickname } = req.body;
    // validation
    if (!email || !password || !nickname) return res.status(400).send("모든 필드를 입력해주세요.");

    let duplicate = Array.from(db.values()).find(user => user.email === email);
    // 409 Conflict
    if (duplicate) return res.status(409).send("이미 존재하는 이메일입니다.");

    db.set(id++, { email, password, nickname });
    res.status(201).json({
        "message": `${nickname}님 환영합니다.`
    });
});
// 회원 개별 조회
app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);
    if (!user) return res.status(404).json({ "message": `${id} User Not Found`})
    res.json(user)
});

// 회원 개별 탈퇴
app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);
    if (!user) return res.status(404).json({ "message": `${id} User Not Found`})
    db.delete(id);
    res.status(204).end();
});

// 회원 전체 조회
app.get('/users', (req,res) => {
    res.json(Array.from(db.values()));
})
