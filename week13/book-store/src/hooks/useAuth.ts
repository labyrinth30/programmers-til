import { login } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import type { LoginProps } from "../pages/Login";

export const useAuth = () => {
    const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const userLogin = (data: LoginProps) => {
        login(data).then((res) => {
            storeLogin(res.token);
            showAlert('로그인 성공');
            navigate('/');
        }, () => {
            showAlert("로그인에 실패했습니다");
        });
    };

    return { userLogin, storeLogin, storeLogout, isLoggedIn };
};
