import { ICartProduct } from "../cartProduct/cart-product";
import { IshippingAddress } from "../ShippingAddress/shipping-address";
import { Iuser } from "../user/user";

export interface Iorder {
    shippingAddress: IshippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: Iuser;
    cartItems: ICartProduct[];
    paidAt: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}