import { describe, it, expect } from "vitest";
import { Product } from "../src/Product";
import { Category } from "../src/Enum_Category";

// ================================================================
// Product — Unit Tests
// ================================================================

describe("Product", () => {

    // Helper tạo product nhanh
    const makeProduct = (stock: number = 10) =>
        new Product("P001", "Laptop", 15_000_000, stock, Category.ELECTRONICS);

    // ─── getPrice ────────────────────────────────────────────────
    describe("getPrice()", () => {
        it("should return the correct price", () => {
            const p = makeProduct();
            expect(p.getPrice()).toBe(15_000_000);
        });
    });

    // ─── isAvailable ─────────────────────────────────────────────
    describe("isAvailable()", () => {
        it("should return true when stock > 0", () => {
            const p = makeProduct(5);
            expect(p.isAvailable()).toBe(true);
        });

        it("should return false when stock = 0", () => {
            const p = makeProduct(0);
            expect(p.isAvailable()).toBe(false);
        });

        it("should return false when stock < 0", () => {
            const p = makeProduct(-1);
            expect(p.isAvailable()).toBe(false);
        });
    });

    // ─── reduceStock ─────────────────────────────────────────────
    describe("reduceStock()", () => {
        it("should reduce stock by the given quantity", () => {
            const p = makeProduct(10);
            p.reduceStock(3);
            expect(p.stock).toBe(7);
        });

        it("should return true when stock is sufficient", () => {
            const p = makeProduct(10);
            expect(p.reduceStock(10)).toBe(true);  // mua đúng bằng stock
        });

        it("should return false when quantity exceeds stock", () => {
            const p = makeProduct(5);
            expect(p.reduceStock(6)).toBe(false);
        });

        it("should NOT change stock when quantity exceeds stock", () => {
            const p = makeProduct(5);
            p.reduceStock(10);
            expect(p.stock).toBe(5);  // stock không đổi
        });
    });
});
