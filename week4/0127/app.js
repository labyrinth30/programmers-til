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
db.set(id++, youtuber3);

app.get('/youtubers/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    if (!youtuber) res.status(404).send('Not Found');
    res.json(youtuber);
})

// 유튜버 추가
app.post('/youtubers', (req, res) => {
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
app.get('/youtubers', (req, res) => {
    let youtubers = {};
    db.forEach((value, key) =>{
        youtubers[key] = value;
    })
    res.json(youtubers);

})

// 삭제
app.delete('/youtubers/:id', (req, res) => {
    const youtuberId = req.params.id;
    // if문 안에는 부정보다 긍정을 검증할 것, 그러나 early return을 하는 것이 더 우선시된다.
    if (!db.has(+youtuberId)) return res.status(404).send('Not Found');
    db.delete(+youtuberId);
    res.json({
        message: `${id}번 유튜버 삭제 완료`
    });
})

// 전체 유튜버 삭제
app.delete('/youtubers', (req, res) => {
    if (db.size === 0) return res.status(404).send('Not Found');
    db.clear();
    res.json({
        message: '전체 유튜버 삭제 완료',
    });
})

// 유튜버 정보 업데이트
app.put('/youtubers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const youtuber = db.get(id);
    if (!youtuber) return res.status(404).send('Not Found');
    const oldChannelTitle = youtuber.channelTitle;
    db.set(id, req.body);
    const channelTitle = req.body.channelTitle;
    res.json({
       message: `${oldChannelTitle} 채널 이름이 ${channelTitle}로 변경되었습니다.`
    });
})