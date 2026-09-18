import { describe, it, expect } from "vitest";
import { Cart } from "../src/Cart";
import { Product } from "../src/Product";
import { Category } from "../src/Enum_Category";
import { CheckOut } from "../src/CheckOut";
import { Coupon } from "../src/ICoupon";

describe("CheckOut", () => {
    const makeProduct = (id: string, price: number = 100_000, stock: number = 10) =>
        new Product(id, `Product_${id}`, price, stock, Category.FOOD);

    it("should return null if cart is empty", () => {
        const cart = new Cart();
        const checkout = new CheckOut();
        expect(checkout.checkOut(cart)).toBeNull();
    });

    it("should return null if item quantity exceeds stock", () => {
        const cart = new Cart();
        const product = makeProduct("P001", 100_000, 2); // stock = 2
        cart.addItem(product, 2);
        product.stock = 1; // stock drops to 1 after adding

        const checkout = new CheckOut();
        expect(checkout.checkOut(cart)).toBeNull();
    });

    it("should process checkout successfully and reduce product stock", () => {
        const cart = new Cart();
        const p1 = makeProduct("P001", 100_000, 10);
        const p2 = makeProduct("P002", 200_000, 5);

        cart.addItem(p1, 2); // 200,000
        cart.addItem(p2, 1); // 200,000

        const checkout = new CheckOut();
        const order = checkout.checkOut(cart);

        expect(order).not.toBeNull();
        expect(order?.subtotal).toBe(400_000);
        expect(order?.discount).toBe(0);
        expect(order?.total).toBe(400_000);
        expect(order?.orderStatus).toBe("PENDING");

        // Stock checks
        expect(p1.stock).toBe(8); // 10 - 2
        expect(p2.stock).toBe(4); // 5 - 1

        // Cart should be empty
        expect(cart.items.length).toBe(0);
    });

    it("should apply coupon discount during checkout", () => {
        const cart = new Cart();
        const p1 = makeProduct("P001", 200_000, 10);
        cart.addItem(p1, 1); // subtotal = 200,000

        const coupon: Coupon = {
            code: "SAVE50K",
            discountType: "FIXED",
            value: 50_000,
            minOrderValue: 100_000,
            isActive: true,
        };

        const checkout = new CheckOut();
        const order = checkout.checkOut(cart, coupon);

        expect(order).not.toBeNull();
        expect(order?.subtotal).toBe(200_000);
        expect(order?.discount).toBe(50_000);
        expect(order?.total).toBe(150_000);
    });

    // ─── cancelOrder ─────────────────────────────────────────────
    describe("cancelOrder()", () => {
        it("should restore stock and change orderStatus to CANCELLED", () => {
            const cart = new Cart();
            const p1 = makeProduct("P001", 100_000, 10);
            cart.addItem(p1, 3); // stock drops to 7 after checkout

            const checkout = new CheckOut();
            const order = checkout.checkOut(cart);
            expect(p1.stock).toBe(7); // Verify stock after checkout

            const result = checkout.cancelOrder(order!);
            expect(result).toBe(true);
            expect(order?.orderStatus).toBe("CANCELLED");
            expect(p1.stock).toBe(10); // Restocked back to 10
        });

        it("should return false if order is already CANCELLED", () => {
            const cart = new Cart();
            const p1 = makeProduct("P001", 100_000, 10);
            cart.addItem(p1, 2);

            const checkout = new CheckOut();
            const order = checkout.checkOut(cart);
            checkout.cancelOrder(order!); // First cancellation

            // Second cancellation attempt
            expect(checkout.cancelOrder(order!)).toBe(false);
        });
    });
});

