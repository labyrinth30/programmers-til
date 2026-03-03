import express from 'express';
import {addLike, deleteLike} from "../controllers/LikesController.js";
const router = express.Router();
router.use(express.json())

// 좋아요 추가
router.post('/:id', addLike);

// 좋아요 삭제
router.delete('/:id', deleteLike);

export default router;
