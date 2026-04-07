import { fetchCart, deleteCart } from "../api/carts.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Cart } from "../models/cart.model";

export const useCart = () => {
    const queryClient = useQueryClient();

    const { data: carts = [] } = useQuery<Cart[]>({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteCart(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData(['cart'], (oldCarts: Cart[] | undefined) => {
                if (!oldCarts) return [];
                return oldCarts.filter((cart) => cart.id !== id);
            });
        }
    });

    const deleteCartItem = (id: number) => {
        deleteMutation.mutate(id);
    };

    return { 
        carts, 
        isEmpty: carts.length === 0, 
        deleteCartItem 
    };
};