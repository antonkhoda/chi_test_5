export interface IBasketRequest {
    id: string;
    basketArr: Array<IBasketRequestArr>;
}

export interface IBasketRequestArr {
    id: number | string;
    count: number;
}
