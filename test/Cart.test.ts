import { describe, it, expect } from "vitest";
import { Cart } from "../src/Cart";
import { Product } from "../src/Product";
import { Category } from "../src/Enum_Category";

// ================================================================
// Cart — Unit Tests
// ================================================================

describe("Cart", () => {

    // Helper
    const makeProduct = (id: string, stock: number = 10) =>
        new Product(id, `Product_${id}`, 100_000, stock, Category.FOOD);

    // ─── addItem ─────────────────────────────────────────────────
    describe("addItem()", () => {
        it("should add product to cart when stock is sufficient", () => {
            const cart = new Cart();
            const p = makeProduct("P001", 10);
            expect(cart.addItem(p, 3)).toBe(true);
            expect(cart.items.length).toBe(1);
        });

        it("should return false when quantity exceeds stock", () => {
            const cart = new Cart();
            const p = makeProduct("P001", 5);
            expect(cart.addItem(p, 6)).toBe(false);
            expect(cart.items.length).toBe(0);
        });

        it("should allow adding exactly all stock", () => {
            const cart = new Cart();
            const p = makeProduct("P001", 5);
            expect(cart.addItem(p, 5)).toBe(true);
        });

        it("should allow adding multiple different products", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            cart.addItem(makeProduct("P002"), 3);
            expect(cart.items.length).toBe(2);
        });
    });

    // ─── removeItem ──────────────────────────────────────────────
    describe("removeItem()", () => {
        it("should remove product from cart by id", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            expect(cart.removeItem("P001")).toBe(true);
            expect(cart.items.length).toBe(0);
        });

        it("should return false when product not in cart", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            expect(cart.removeItem("P999")).toBe(false);
        });

        it("should only remove the correct product", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            cart.addItem(makeProduct("P002"), 1);
            cart.removeItem("P001");
            expect(cart.items.length).toBe(1);
            expect(cart.items[0].product.id).toBe("P002");
        });
    });

    // ─── updateQuantity ──────────────────────────────────────────
    describe("updateQuantity()", () => {
        it("should add quantity to existing cart item", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            cart.updateQuantity("P001", 3);
            expect(cart.items[0].quantity).toBe(5);  // 2 + 3
        });

        it("should return true when product is found", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            expect(cart.updateQuantity("P001", 1)).toBe(true);
        });

        it("should return false when product not in cart", () => {
            const cart = new Cart();
            expect(cart.updateQuantity("P999", 1)).toBe(false);
        });
    });

    // ─── clearCart ───────────────────────────────────────────────
    describe("clearCart()", () => {
        it("should remove all items from cart", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 1);
            cart.addItem(makeProduct("P002"), 2);
            cart.clearCart();
            expect(cart.items.length).toBe(0);
        });

        it("should work on already empty cart", () => {
            const cart = new Cart();
            cart.clearCart();
            expect(cart.items.length).toBe(0);
        });
    });

    // ─── getSubTotal ─────────────────────────────────────────────
    describe("getSubTotal()", () => {
        it("should return 0 for an empty cart", () => {
            const cart = new Cart();
            expect(cart.getSubTotal()).toBe(0);
        });

        it("should calculate correct subtotal for cart items", () => {
            const cart = new Cart();
            const p1 = makeProduct("P001", 10); // price = 100_000
            const p2 = makeProduct("P002", 10); // price = 100_000
            cart.addItem(p1, 2); // 200_000
            cart.addItem(p2, 3); // 300_000
            expect(cart.getSubTotal()).toBe(500_000);
        });
    });

    // ─── getItemCount ────────────────────────────────────────────
    describe("getItemCount()", () => {
        it("should return 0 for an empty cart", () => {
            const cart = new Cart();
            expect(cart.getItemCount()).toBe(0);
        });

        it("should return sum of quantities of all items", () => {
            const cart = new Cart();
            cart.addItem(makeProduct("P001"), 2);
            cart.addItem(makeProduct("P002"), 5);
            expect(cart.getItemCount()).toBe(7);
        });
    });
});

