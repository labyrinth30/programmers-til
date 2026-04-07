import { useLocation } from "react-router-dom";
import { fetchCategory } from "../api/category.api";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("category_id");

    const { data: category = [] } = useQuery({
        queryKey: ['category'],
        queryFn: fetchCategory,
        select: (data) => {
            if (!data) return [];
            const categoryWithAll = [
                {
                    id: null,
                    name: "전체",
                },
                ...data,
            ];

            return categoryWithAll.map((item) => ({
                ...item,
                isActive: item.id === (categoryId ? Number(categoryId) : null),
            }));
        }
    });

    return { category };
};
