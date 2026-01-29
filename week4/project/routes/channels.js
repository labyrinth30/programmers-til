import express from 'express';
const router = express.Router();
router.use(express.json());

// DB
let db = new Map();
var id = 1;

// '/channels'
router
    .route('/')
    .get((req, res) => {
        let { email } = req.query;

        let channels = [];

        // db에서 하나씩 가져온 채널 주인의 email이 req.body.email와 같은지 검증
        db.forEach((value, key) => {
            if (value.email === email) channels.push(value);
        })
        // 예외처리
        console.log(channels);

        if(channels.length === 0) return res.status(404).json(
            { "message": "No Channel Found" }
        )
        res.json(channels);
    })
    .post((req, res) => {
        if (!req.body.channelTitle) return res.status(400).json({ "message": "Channel Title is required"});
        db.set(id++, req.body);
        res.status(201).send({
            "message": `${req.body.channelTitle} 채널이 생성되었습니다.`
        });

    })

// 'channels/:id'
router
    .route('/:id')
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

export default router;
