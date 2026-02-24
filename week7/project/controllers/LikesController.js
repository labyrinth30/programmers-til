import conn from '../db.js';
import statusCode from 'http-status-codes';


export const addLike = (req, res) => {
    const id = req.params.id;
    const { user_id } = req.body;
    const sql = `INSERT INTO likes (user_id, liked_book_id)
    VALUES (?, ?)`;
    const values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
};

export const deleteLike = (req, res) => {
    const id = req.params.id;
    const { user_id } = req.body;
    const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    const values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
}
