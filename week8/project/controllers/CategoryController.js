import db from "../db.js";
import {StatusCodes} from "http-status-codes";

export const findAllCategories = (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        return res.status(StatusCodes.OK).json(results);
    });
};
