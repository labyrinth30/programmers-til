import express from 'express';
const app = express();

app.listen(3000);

let db = new Map();

db.set(1, 'John'); // key로 value를 찾을 수 있는 한 쌍
db.set(2, 'Peter');
db.set(3, 'Amy');

app.get('/:id', function (req, res) {
    const { id } = req.params;
    if (!db.has(+id)) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json({
        id,
        name: db.get(+id),
    });
})
