import express from 'express';
const router = express.Router();
router.use(express.json());

// DB
let db = new Map();
var id = 1;

// 로그인
router.post('/login', (req,res) => {
    const { email, password } = req.body;

    // email로 db에 있는 유저 조회하기
    let user;
    // 배열 생성 없이 하나씩 꺼내서 검사
    for ( const u of db.values()) {
        if (u.email === email) {
            user = u;
            // 찾으면 중단
            break;
        }
    }
    if (!user) return res.status(401).json({ "message": "Invalid Email" });
    // password도 맞는지 비교
    if (user.password !== password) return res.status(401).json({"message": "Invalid Password"});
    res.json(user);
});

// 회원가입
router.post('/register', (req,res) => {
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
router.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);
    if (!user) return res.status(404).json({ "message": `${id} User Not Found`})
    res.json(user)
});

// 회원 개별 탈퇴
router.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);
    if (!user) return res.status(404).json({ "message": `${id} User Not Found`})
    db.delete(id);
    res.status(204).end();
});

// 회원 전체 조회
router.get('/users', (req,res) => {
    res.json(Array.from(db.values()));
})

export default router;
