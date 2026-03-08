import conn from '../db.js';
import statusCode from 'http-status-codes';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {ensureAuthorization} from "../auth.js";

dotenv.config();

// 장바구니 담기
export const addToCart = (req, res) => {
    const { book_id, quantity } = req.body;
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
    const sql = `INSERT INTO cartItems (book_id, quantity, user_id)
    VALUES (?, ?, ?)`;
    const values = [book_id, quantity, authorization.id];
    conn.query(sql, values, (err, results) => {
        if (err) return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(statusCode.CREATED).json(results);
    });
};

// 장바구니 아이템 목록 조회
export const getCartItems = (req, res) => {
    const { selected } = req.body || {};
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
    let sql =
        `SELECT cartItems.id, book_id, title, summary, quantity, price
        FROM cartItems LEFT JOIN books
        ON cartItems.book_id = books.id
        WHERE user_id = ?`
    let values = [authorization.id];
    if (selected) { // 주문서 작성시 선택한 장바구니 목록 조회
        sql += ` AND cartItems.id IN (?)`;
        values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
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
