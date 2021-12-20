import { ICategoryResponse } from "../category/category";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    imagePath: string;
    description: string;
    price: number;
}

export interface IProductResponse {
    id: string;
    category: ICategoryResponse;
    name: string;
    imagePath: string;
    description: string;
    price: number;
}