import express from 'express';
const router = express.Router();
router.use(express.json());
import conn from '../db.js';

router
    .route('/')
    .get((req, res) => {
        let { userId } = req.body;
        let sql = 'SELECT * FROM channels WHERE user_id = ?'

        // && 연산자로 userId 유효성 검사
        userId && conn.query(sql, userId,
            (err, results) => {
            if(results.length) res.json(results);
            else res.status(404).json({"message": "No Channel Found"});
            })
    })
    .post((req, res) => {
        const { name, userId } = req.body;
        if (!name || !userId) res.status(400).json({"message": "name or userId is required"});
        let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
        let values = [name, userId];
        conn.query(sql, values, (err, results) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(results);
        })
    })

// 'channels/:id'
router
    .route('/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id);
        let sql =`SELECT * FROM channels where id= ?`
        conn.query(sql,
            id,
            (err, results, fields) => {
                if (err) return res.status(500).json(err);
                if (results.length) res.json(results);
                else res.status(404).json({"message": `${id} Channel Not Found`});
            }
        )
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
