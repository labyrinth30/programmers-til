const express = require('express');
const app = express();

let youtuber1 = {
    channelTitle: "십오야",
    sub: "593만명",
    videoNum: "993개"
}

let youtuber2 = {
    channelTitle: "침착맨",
    sub: "223만명",
    videoNum: "6600개"
}

let youtuber3 = {
    channelTitle: "레니아워",
    sub: "20만명",
    videoNum: "123개"
}

app.get('/watch', function (req, res) {
    const { nickname } = req.query;

    if (nickname == "십오야") {
        res.json(youtuber1);
    }
    if (nickname == "침착맨") {
        res.json(youtuber2);
    }
    if (nickname == "레니아워") {
        res.json(youtuber3);
    }
    res.json({
        message: "알 수 없는 유튜버입니다."
    });
});

app.listen(3000);
