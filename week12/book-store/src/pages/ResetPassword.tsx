import { useForm } from "react-hook-form";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, resetRequest, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useState } from "react";


export interface ResetPasswordProps {
    email: string;
    password: string;
}

function ResetPassword() {
    const [resetRequested, setResetRequested] = useState(false);

    const showAlert = useAlert();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordProps>();

    const onSubmit = (data: ResetPasswordProps) => {
        if (resetRequested) {
            resetPassword(data).then((res) => {
                showAlert('비밀번호 초기화 성공');
                navigate('/login');
            })
        } else {
            // 초기화 요청
            resetRequest(data).then((res) => {
                setResetRequested(true);
            })
        }
    };

    return (
        <>
            <Title size="large">비밀번호 초기화</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                    </fieldset>
                    {resetRequested && (
                        <fieldset>
                            <InputText
                                placeholder="비밀번호"
                                inputType="password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                        </fieldset>
                    )}
                    <fieldset>
                        <Button type="submit" size="medium" schema="primary">
                            {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
                        </Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
}

export default ResetPassword;