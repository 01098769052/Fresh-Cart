import { Iproduct } from './../product/product';
export interface ICartProduct {
    count:number,
    price:number,
    product:Iproduct,
    _id:string
}