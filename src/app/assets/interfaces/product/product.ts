import { ICategoryResponse } from "../category/category";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    imagePath: string;
    description: string;
    weight: string;
    price: number;
    count: number;
}

export interface IProductResponse {
    id: number;
    category: ICategoryResponse;
    name: string;
    path: string;
    imagePath: string;
    description: string;
    weight: string;
    price: number;
    count: number;
}