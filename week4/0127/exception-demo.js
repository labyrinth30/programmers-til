import express from 'express';
const app = express();
app.listen(3000, () => console.log('Server is running on port 3000'))

const fruits = [
    { id: 1, name: 'apple'},
    { id: 2, name: 'banana'},
    { id: 3, name: 'orange'},
    { id: 4, name: 'grape'},
]

// 과일 전체 조회
app.get('/fruits', (req, res) => {
    res.json(
        fruits
    )
})

// 과일 개별 조회
app.get('/fruits/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const fruit = fruits.find(fruit => fruit.id === id);
    if (!fruit) return res.status(404).json({
        message: `${id}번 fruit Not Found`
    });
    res.json(fruit);
})