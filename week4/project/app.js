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

// '/channels'
app
    .route('/channels')
    .get((req, res) => {
        const channels = Array.from(db.values());
        res.json(channels);
    })
    .post((req, res) => {
    db.set(id++, req.body);
    if (!req.body.channelTitle) return res.status(400).json({ "message": "Channel Title is required"});
    res.status(201).send({
        "message": `${req.body.channelTitle} 채널이 생성되었습니다.`
    });

})

// 'channels/:id'
app
    .route('/channels/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
        const channel = db.get(id);
        if (!channel) return res.status(404).json({ "message": `${id} Channel Not Found`});
        res.json(channel);
    })
    .patch((req, res) => {
        const id = parseInt(req.params.id);
        let channel = db.get(id);
        if (!channel) return res.status(404).json({"message": `${id} Channel Not Found`});
        const oldChannelTitle = channel.channelTitle;
        const newChannel = {
            ...channel,
            ...req.body
        };
        db.set(id, newChannel);
        res.json({
            "message": `${oldChannelTitle}이 ${newChannel.channelTitle}로 변경되었습니다.`,
        })
    })
    .delete((req, res) => {
        const id = parseInt(req.params.id);
        const channel = db.get(id);
        if (!channel) return res.status(404).json({ "message": `${id} Channel Not Found`});
        db.delete(id);
        res.status(204).end();
    })