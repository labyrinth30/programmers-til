import conn from '../db.js';
import statusCode from 'http-status-codes';

// 장바구니 담기
export const addToCart = (req, res) => {
    const { book_id, quantity,user_id } = req.body;
    const sql = `INSERT INTO cartItems (book_id, quantity, user_id)
    VALUES (?, ?, ?)`;
    const values = [book_id, quantity, user_id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
};

// 장바구니 아이템 목록 조회
export const getCartItems = (req, res) => {
    const { user_id, selected } = req.body;
    const sql =
        `SELECT cartItems.id, book_id, title, summary, quantity, price
        FROM cartItems LEFT JOIN books
        ON cartItems.book_id = books.id
        WHERE user_id = ?
        AND cartItems.id IN (?)`
    conn.query(sql, [user_id, selected], (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.OK).json(results);
    });
};

// 장바구니 도서 삭제
export const removeCartItem = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, id, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.OK).json(results);
    });
}
