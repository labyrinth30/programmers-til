import express from 'express';
import { findBookById, findBooks } from "../controllers/BooksController.js";
const router = express.Router();
router.use(express.json())

// 전체 도서 조회
router.get('/', findBooks)

// 개별 도서 조회
router.get('/:id', findBookById)

export default router;
