import express from 'express';
import {gerOrders, getOrderDetail, order} from "../controllers/OrdersController.js";
const router = express.Router();
router.use(express.json())

// 주문 하기
router.post('/', order);

// 주문 목록 조회
router.get('/', gerOrders);

// 주문 상세 상품 조회
router.get('/:id', getOrderDetail);

export default router;
