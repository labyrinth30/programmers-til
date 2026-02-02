import express from 'express';
const router = express.Router();
router.use(express.json());
import conn from '../db.js';

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let sql =
            `SELECT * FROM users WHERE email = ? AND password = ?`
        const [results] = await conn.query(sql,
            [email, password]
        );

        if (results.length > 0) {
            // 응답으로 보낼 유저 객체
            const user = results[0];
            res.json(user);
        } else {
            res.status(400).json({ "message": "이메일 또는 비밀번호가 틀렸습니다." });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": "서버 오류가 발생했습니다." });
    }
});

router.post('/register', (req,res) => {
    const { email, password, nickname, contact } = req.body;
    // validation
    if (!email || !password || !nickname || !contact) return res.status(400).send("모든 필드를 입력해주세요.");
    let sql =  `INSERT INTO users (email, password, name, contact) VALUES (?, ?, ?, ?)`
    conn.query(sql,
        [email, password, nickname, contact],
        (err, results, fields) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    )
});

router.get('/users/:email', (req,res) => {
    const email = req.params.email;
    let sql =`SELECT * FROM users where email= ?`
        conn.query(sql,
        email,
        (err, results, fields) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    )
});

router.delete('/users/:email', (req,res) => {
    const email = req.params.email;
    let sql = `DELETE FROM users WHERE email = ?`
    conn.query(
        sql, email,
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    )
});

router.get('/users', (req,res) => {
    let sql =`SELECT * FROM users`
    conn.query(
        sql,
        (err, results) => {
            res.json(results);
        }
    )
})

export default router;
