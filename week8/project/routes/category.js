import express from 'express';
import {findAllCategories} from "../controllers/CategoryController.js";
const router = express.Router();
router.use(express.json())

router.get('/', findAllCategories);

export default router;
