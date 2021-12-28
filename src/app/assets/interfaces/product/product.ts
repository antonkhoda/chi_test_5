import { ICategoryResponse } from '../category/category';

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

export interface IProductRequestFakeAPI {
    id: number;
    price: number;
    category: string;
    description: string;
    title: string;
    image: string;
    rating: object; 
}

export interface IProductResponseFakeAPI {
    id: number;
    price: number;
    category: string;
    description: string;
    title: string;
    image: string;
    rating: object;
    basket: boolean;
    liked: boolean;
}

export interface IProductModedFakeAPI {
  id: number;
  price: number;
  category: string;
  description: string;
  title: string;
  image: string;
  rating: object;
  basket: boolean;
  liked: boolean;
  count: number
}
