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
    rating: IProductRatingFakeAPI; 
}

export interface IProductResponseFakeAPI {
  id: number;
  price: number;
  category: string;
  description: string;
  title: string;
  image: string;
  rating: IProductRatingFakeAPI;
  count: number;
}

export interface IProductRatingFakeAPI {
  count: number;
  rate: number;
}