import express from "express";
const router = express.Router();
router.use(express.json());
import conn from "../db.js";
import { body, validationResult } from "express-validator";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  next();
};

router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("email 형식이 아닙니다."),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("password must be a string"),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM users where email= ?`;
    conn.query(sql, email, (err, results) => {
      if (err) {
        return res.status(400).json(err);
      }
      let user = results[0];
      if (user && user.password === password) {
        // 토큰 발급
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
            issuer: "my-app",
          },
        );
        return res
          .cookie("token", token, {
            httpOnly: true,
          })
          .end();
      } else {
        return res.status(401).json({ message: "Login Failed" });
      }
    });
  },
);

router.post(
  "/register",
  [
    body("email").notEmpty().isEmail().withMessage("email 형식이 아닙니다."),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("password must be a string"),
    body("nickname")
      .notEmpty()
      .isString()
      .withMessage("nickname must be a string"),
    body("contact")
      .notEmpty()
      .isString()
      .withMessage("contact must be a string"),
    validate,
  ],
  (req, res) => {
    const { email, password, nickname, contact } = req.body;
    const sql = `INSERT INTO users (email, password, name, contact) VALUES (?, ?, ?, ?)`;
    const values = [email, password, nickname, contact];
    conn.query(sql, values, (err, results, fields) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  },
);

router
  .route("/users")
  .get(
    [
      body("email").notEmpty().isEmail().withMessage("email 형식이 아닙니다."),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      let sql = `SELECT * FROM users where email= ?`;
      conn.query(sql, email, (err, results, fields) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json(results);
      });
    },
  )
  .delete(
    [
      body("email").notEmpty().isEmail().withMessage("email 형식이 아닙니다."),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      let sql = `DELETE FROM users WHERE email = ?`;
      conn.query(sql, email, (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(204).end();
      });
    },
  );

export default router;
