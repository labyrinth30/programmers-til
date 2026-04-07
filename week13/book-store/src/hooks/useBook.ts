import { useState } from "react";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useBook = (bookId: string | undefined) => {
    const [cartAdded, setCartAdded] = useState<boolean>(false);
    
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const queryClient = useQueryClient();

    const { data: book = null } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => bookId ? fetchBook(bookId) : Promise.reject('No book Id'),
        enabled: !!bookId,
    });

    const likeMutation = useMutation({
        mutationFn: (id: number) => likeBook(id),
        onSuccess: () => {
            if (book) {
                queryClient.setQueryData(['book', bookId], {
                    ...book,
                    liked: true,
                    likes: book.likes + 1
                });
            }
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: (id: number) => unlikeBook(id),
        onSuccess: () => {
            if (book) {
                queryClient.setQueryData(['book', bookId], {
                    ...book,
                    liked: false,
                    likes: book.likes - 1
                });
            }
        }
    });

    const cartMutation = useMutation({
        mutationFn: (quantity: number) => {
            if (!book) return Promise.reject('No book');
            return addCart({ book_id: book.id, quantity });
        },
        onSuccess: () => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        }
    });

    const addToCart = (quantity: number) => {
        cartMutation.mutate(quantity);
    };

    const likeToggle = () => {
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.');
            return;
        }

        if (!book) return;

        if (book.liked) {
            unlikeMutation.mutate(book.id);
        } else {
            likeMutation.mutate(book.id);
        }
    };

    return { book, likeToggle, addToCart, cartAdded };
}