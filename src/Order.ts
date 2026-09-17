import { IOrder } from "./IOrder";
import { CProduct } from "./Cart_Items";
export class Order implements IOrder {
    orderId: string;
    items: CProduct[] = [];
    subtotal: number;
    discount: number;
    total: number;
    createAt: Date;
    orderStatus: "PENDING" | "CONFIRMED" | "CANCELLED";

    constructor(
        orderId: string,
        items: CProduct[],
        subtotal: number,
        discount: number,
        total: number,
        createAt: Date,
        orderStatus: "PENDING" | "CONFIRMED" | "CANCELLED",
    ) {
        this.orderId = orderId;
        this.items = items;
        this.subtotal = subtotal;
        this.discount = discount;
        this.total = total;
        this.createAt = new Date();
        this.orderStatus = orderStatus;
    }
}