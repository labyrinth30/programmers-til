import express from 'express';
const router = express.Router();
router.use(express.json());
import {body, param, validationResult} from 'express-validator';
import conn from '../db.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    }
    return res.status(400).json({"message": errors.array()[0].msg});
}

router
    .route('/')
    .get([
        body('userId').notEmpty().isInt().withMessage('userId must be a number'),
        validate
        ],
        (req, res) => {
        let { userId } = req.body;
        let sql = 'SELECT * FROM channels WHERE user_id = ?'
        conn.query(sql, userId,
            (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).json({
                        "message": "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                    });
                }
            if (results.length) return res.json(results);
            else return res.status(404).json({"message": "No Channel Found"});
            })
    })
    .post(body('userId').notEmpty().isInt().withMessage('userId must be a number'),
        body('name').notEmpty().isString().withMessage('name must be a string')
        ,(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json({"message": errors.array()[0].msg});

        const { name, userId } = req.body;

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
    .put(
        param('id').notEmpty().withMessage('채널id가 필요해요.').isInt().withMessage('id must be a number'),
        body('name').notEmpty().isString().withMessage('name must be a string'),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) res.status(400).json({"message": errors.array()[0].msg});
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const sql = 'UPDATE channels SET name=? WHERE id = ?'
        const values = [name,id];

        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).json({
                        "message": "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                    });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({"message": `${id} Channel Not Found`});
                }
                return res.json({
                    "message": "Channel Updated Successfully",
                });
            })
    })
    .delete(
        param('id').notEmpty().isInt().withMessage('id must be a number'),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({"message": errors.array()[0].msg});
            }
        const id = parseInt(req.params.id);
        const sql = 'DELETE FROM channels WHERE id = ?';
        conn.query(sql, id, (err, results) => {
            if (err) {
                return res.status(400).end();
            }
            if (results.affectedRows === 0) {
                return res.status(404).end();
            }
            return res.status(204).end();
        })
    })

export default router;
