import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('email').isEmail().withMessage('이메일 형식을 확인해주세요.'),
    body('password').notEmpty().withMessage('비밀번호를 입력해주세요.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // 에러가 없으면 다음 단계(컨트롤러)로 이동
    }
];
