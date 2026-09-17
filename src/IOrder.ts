import { CProduct } from "./Cart_Items";
import { Product } from "./Product";

export interface IOrder {
    orderId: string;
    items: CProduct[];
    subtotal: number;
    discount: number;
    total: number;
    createAt: Date;
    orderStatus: "PENDING" | "CONFIRMED" | "CANCELLED";


}