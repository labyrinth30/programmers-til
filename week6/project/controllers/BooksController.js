import db from "../db.js";
import {StatusCodes} from "http-status-codes";

export const findBooks = (req, res) => {
    const { categoryId } = req.query;
    if ( categoryId ) {
        const sql = 'SELECT * FROM books WHERE category_id = ?';
        db.query(sql, categoryId, (err, results) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
            return res.status(StatusCodes.OK).json(results);
        });
    } else {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(StatusCodes.OK).json(results);
    });
    }
};

export const findBookById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, id, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        if (results.length === 0) return res.status(StatusCodes.NOT_FOUND).end();
        return res.status(StatusCodes.OK).json(results[0]);
    });
};
