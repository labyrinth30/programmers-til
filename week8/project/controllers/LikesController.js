import conn from '../db.js';
import statusCode from 'http-status-codes';
import jwt from "jsonwebtoken";


export const addLike = (req, res) => {
    const book_id = req.params.id;
    const authorization = ensureAuthorization(req, res);
    if ( authorization instanceof jwt.TokenExpiredError ) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "토큰이 만료되었습니다."
        })
    }
    if ( authorization instanceof jwt.JsonWebTokenError ) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "잘못된 토큰입니다."
        })
    }
    const sql = `INSERT INTO likes (user_id, book_id)
    VALUES (?, ?)`;
    const values = [authorization.id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
};

export const deleteLike = (req, res) => {
    const book_id = req.params.id;
    const authorization = ensureAuthorization(req, res);
    if ( authorization instanceof jwt.TokenExpiredError ) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "토큰이 만료되었습니다."
        })
    }
    if ( authorization instanceof jwt.JsonWebTokenError ) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "잘못된 토큰입니다."
        })
    }
    const sql = `DELETE FROM likes WHERE user_id = ? AND book_id = ?`;
    const values = [authorization.id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
}

export const ensureAuthorization = (req, res) => {
    try {
        const receivedJwt = req.headers["authorization"];
        const decodedJwt = jwt.verify(receivedJwt, process.env.JWT_SECRET);
        return decodedJwt;
    } catch (err) {
        return err;
    }
};
