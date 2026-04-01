import { httpClient } from "./http";
import type { Category } from "../models/category.model";

export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>("/category");
    return response.data;
}