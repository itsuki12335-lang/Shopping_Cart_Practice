import { Cart } from "./Cart";
import { Coupon } from "./ICoupon";
import { Order } from "./Order";
export class CheckOut {
    checkOut(cart: Cart, coupon?: Coupon | null): Order | null {
        if (coupon) {
            cart.applyCoupon(coupon);
        }
        if (cart.items.length == 0) return null;
        for (let temp of cart.items) {
            if (temp.quantity > temp.product.stock) return null;
        }
        for (let temp of cart.items) {
            temp.product.reduceStock(temp.quantity);
        }
        let order = new Order(
            "ODR" + Date.now(),
            cart.items,
            cart.getSubTotal(),
            cart.getDiscount(),
            cart.getTotal(),
            new Date(),
            "PENDING"
        );
        cart.clearCart();
        return order;
    }
}

