import express from 'express';

const app = express();
app.use(express.json());
app.listen(3000, () => console.log('Server is running on port 3000'));

const youtuber1 = {
    channelTitle: "레니아워",
    sub: "1만명",
    videoNum : "123개"
}

const youtuber2 = {
    channelTitle: "하스슽톤",
    sub: "12만명",
    videoNum : "23개"
}

const youtuber3 = {
    channelTitle: "더클라임",
    sub: "14만명",
    videoNum : "13개"
}

let db = new Map();
let id = 1;

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3)

app.get('/youtuber/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    if (!youtuber) res.status(404).send('Not Found');
    res.json(youtuber);
})

// 유튜버 추가
app.post('/youtuber', (req, res) => {
    const youtuber = req.body;
    const newYoutuber = {
        ...youtuber,
        sub: 0,
        videoNum: 0,
    };
    const newYoutuberId = db.size === 0 ? 1 :Math.max(...db.keys()) + 1;
    // db.set(newYoutuberId, newYoutuber);
    db.set(id++, newYoutuber);
    res.json(`${newYoutuber.channelTitle} 등록 완료`);
});

// 전체 조회
app.get('/youtuber', (req, res) => {
    res.json(Array.from(db.values()));
})
