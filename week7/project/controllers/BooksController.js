import db from "../db.js";
import {StatusCodes} from "http-status-codes";

export const findBooks = (req, res) => {
    const { categoryId, isNew, limit, currentPage } = req.query;
    let sql = 'SELECT * FROM books';
    const offset = limit * (currentPage - 1);
    let values = [];
    if (categoryId && isNew) {
        sql += ' WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values.push(categoryId);
    }
    else if (categoryId) {
        sql += ' WHERE category_id = ?';
        values.push(categoryId);
    }
    else if (isNew) {
        sql += ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    }
    sql += ' LIMIT ? OFFSET ?';
    values.push(parseInt(limit || 3), offset);

    db.query(sql, values, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(StatusCodes.OK).json(results);
    });
};

export const findBookById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?';
    db.query(sql, id, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        if (results.length === 0) return res.status(StatusCodes.NOT_FOUND).end();
        return res.status(StatusCodes.OK).json(results[0]);
    });
};
