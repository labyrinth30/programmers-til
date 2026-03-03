import express from 'express';
const router = express.Router();
router.use(express.json());
import { register, login, passwordResetRequest, passwordReset  } from '../controllers/UsersController.js';
import {validateRegister} from "../validators/userValidator.js";

router.post(
    '/register',
    validateRegister,
     register,
);
// 로그인
router.post('/login', login)
// 비밀번호 초기화 요청
router.post('/reset', passwordResetRequest)
// 비밀번호 초기화
router.put('/reset', passwordReset)

export default router;
