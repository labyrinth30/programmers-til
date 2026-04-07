import { useState } from "react";
import type { OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
    const queryClient = useQueryClient();
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const { data: orders = [] } = useQuery<OrderListItem[]>({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });

    const orderDetailMutation = useMutation({
        mutationFn: (orderId: number) => fetchOrder(orderId),
        onSuccess: (orderDetail, orderId) => {
            queryClient.setQueryData(['orders'], (oldOrders: OrderListItem[] | undefined) => {
                if (!oldOrders) return [];
                return oldOrders.map((order) => {
                    if (order.id === orderId) {
                        return {
                            ...order,
                            detail: orderDetail
                        };
                    }
                    return order;
                });
            });
        }
    });

    const selectOrderItem = (orderId: number) => {
        // 요청 방어
        if (orders.filter((item) => item.id === orderId)[0]?.detail) {
            setSelectedItemId(orderId);
            return;
        }
        
        setSelectedItemId(orderId);
        orderDetailMutation.mutate(orderId);
    };

    return { orders, selectedItemId, selectOrderItem };
};
