import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import type { Delivery, OrderSheet } from "../models/order.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { useAlert } from "../hooks/useAlert";
import { order } from "../api/order.api";

interface DeliveryForm extends Delivery {
    addressDetail: string;
}

function Order() {
    const { showAlert, showConfirm } = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const orderDataFromCart = location.state;

    if (!orderDataFromCart) {
        return <p>잘못된 접근입니다.</p>;
    }

    const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<DeliveryForm>();

    const handlePay = (data: DeliveryForm) => {
        const orderData: OrderSheet = {
            ...orderDataFromCart,
            delivery: {
                ...data,
                address: `${data.address} ${data.addressDetail}`,
            }
        }
        // 서버로 넘기기
        showConfirm('주문하시겠습니까?', () => {
            order(orderData).then(() => {
                showAlert('주문이 처리되었습니다');
                navigate('/orderlist');
            })
        })
    }

    return (
        <>
            <Title size="large">주문 작성</Title>
            <CartStyle>
                <div className="content">
                    <div className="order-info">
                        <Title size="medium" color="text">
                            배송 정보
                        </Title>
                        <form className='delivery'>
                            <fieldset>
                                <label>주소</label>
                                <div className="input">
                                    <InputText inputType="text" {...register('address', {
                                        required: true,
                                    })} />
                                </div>
                                <FindAddressButton onCompleted={(address) => {
                                    setValue('address', address);
                                }} />
                            </fieldset>
                            {errors.address && <p className="error-text">주소를 입력해 주세요</p>}
                            <fieldset>
                                <label>상세 주소</label>
                                <div className="input">
                                    <InputText inputType="text" {...register('addressDetail', {
                                        required: true,
                                    })} />
                                </div>
                            </fieldset>
                            {errors.addressDetail && <p className="error-text">상세 주소를 입력해 주세요</p>}
                            <fieldset>
                                <label>수령인</label>
                                <div className="input">
                                    <InputText inputType="text" {...register('receiver', {
                                        required: true,
                                    })} />

                                </div>
                            </fieldset>
                            {errors.receiver && <p className="error-text">수령인을 입력해 주세요</p>}
                            <fieldset>
                                <label>연락처</label>
                                <div className="input">
                                    <InputText inputType="text" {...register('contact', {
                                        required: true,
                                    })} />
                                </div>
                            </fieldset>
                            {errors.contact && <p className="error-text">연락처를 입력해 주세요</p>}
                        </form>
                        <strong>
                            {firstBookTitle} 등 총 {totalQuantity} 권
                        </strong>
                    </div>
                </div>
                <div className="summary">
                    <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                    <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>
                        결제하기
                    </Button>
                </div>
            </CartStyle>
        </>
    );
}

export default Order;
