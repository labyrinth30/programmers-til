import styled from "styled-components";
import Title from "../components/common/Title";
import { formatNumber } from "../utils/format";
import { useOrders } from "../hooks/useOrders";
import type { OrderListItem } from "../models/order.model";
import Button from "../components/common/Button";
import React from "react";

function OrderList() {
    const { orders, selectedItemId, selectOrderItem } = useOrders();

    return (
        <OrderListStyle>
            <Title size="large">주문 내역</Title>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>주문일자</th>
                        <th>주소</th>
                        <th>수령인</th>
                        <th>전화번호</th>
                        <th>대표상품명</th>
                        <th>수량</th>
                        <th>금액</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: OrderListItem) => (
                        <React.Fragment key={order.id}>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.address}</td>
                                <td>{order.receiver}</td>
                                <td>{order.contact}</td>
                                <td>{order.bookTitle}</td>
                                <td>{order.totalQuantity} 권</td>
                                <td>{formatNumber(order.totalPrice)} 원</td>
                                <td>
                                    <Button size="small" scheme="primary" onClick={() => selectOrderItem(order.id)}>
                                        상세보기
                                    </Button>
                                </td>
                            </tr>
                            {selectedItemId === order.id && (
                                < tr >
                                    <td colSpan={8}>
                                        {
                                            order?.detail && order.detail.map((item) => (
                                                <li key={item.bookId}>
                                                    <div className="detail">
                                                        <span>{item.title}</span>
                                                        <span>{item.author}</span>
                                                        <span>{formatNumber(item.price)} 원</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </td>
                                </tr >
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </OrderListStyle >
    );
}

const OrderListStyle = styled.div`
    padding: 24px 0 0 0;
    
    table {
        width: 100%;
        border-collapse: collapse;
        border-top: 1px solid ${({ theme }) => theme.color.border};
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid ${({ theme }) => theme.color.border};
        }
    }
    .detail {
        margin: 0;
        li {
        list-style: square;
        div {
        display: flex;
        padding: 8px 12px;
        gap: 8px
        }
        }
    }
`;

export default OrderList;
