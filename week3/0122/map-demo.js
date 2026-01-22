import express from 'express';
const app = express();
let db = new Map();
app.listen(3000);

let notebook = {
    productName: "Notebook",
    price: 2000000,
};

db.set(1, notebook);
// 🍯tip! 기존에 있는 객체에 객체 안에 있는 데이터를 넣고 싶은 경우 ...(전개 연산자)를 사용하면 쉽게 할 수 있다.
// 객체에 id 값 추가

app.get('/:id', function (req, res) {
    const { id } = req.params;
    if (!db.has(+id)) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json({
        id: +id,
        ...db.get(+id),
    });
})



