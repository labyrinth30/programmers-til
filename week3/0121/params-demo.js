const express = require('express');
const app = express();

app.get('/watch', function (req, res) {
    const query = req.query;

    const { v,t } = query;
    console.log(v);
    console.log(t);

    res.json({
        vidaeo: v,
        time: t
    })
});

app.listen(3000);
