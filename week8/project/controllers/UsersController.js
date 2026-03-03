import {validationResult} from "express-validator";
import db from "../db.js";
import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config()

export const register = (req, res) => {
    const {email, password} = req.body;
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const sql = `INSERT INTO users (email, password, salt)
                 VALUES (?, ?, ?)`;
    const values = [email, hashPassword, salt];
    db.query(sql, values,
        (err, results) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message});
            return res.status(StatusCodes.CREATED).json(results)
        });
};

export const login = (req, res) => {
    const {email, password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    db.query(sql, values, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        const user = results[0];
        // salt를 꺼내 들어온 비밀번호를 암호화하고 db의 비밀번호와 비교
        const hashPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 10, 'sha512').toString('base64');
        if (user && user.password === hashPassword) {
            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                    issuer: 'bookstore-api',
                });
            res.cookie("access_token", token, {
                httpOnly: true,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
        return res.status(StatusCodes.OK).json(results)
    });
};


export const passwordResetRequest = (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    db.query(query, values, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).json({
                email
            });
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

export const passwordReset = (req, res) => {
    const { email, password } = req.body;
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    const query = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
    const values = [hashPassword, salt, email];

    db.query(query, values, (err, results) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        if (results.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).end();
        return res.status(StatusCodes.OK).json(results);
    });
};
