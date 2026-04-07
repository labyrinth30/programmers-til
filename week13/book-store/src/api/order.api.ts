import { httpClient } from "./http";
import type { Order, OrderDetailItem, OrderSheet } from "../models/order.model";

export const order = async (orderData: OrderSheet) => {
    const response = await httpClient.post('/orders', orderData);
    return response.data;
}

export const fetchOrders = async () => {
    const response = await httpClient.get<Order[]>('/orders');
    return response.data;
}

export const fetchOrder = async (orderId: number) => {
    const response = await httpClient.get<OrderDetailItem[]>(`/orders/${orderId}`);
    return response.data;
}