import { CProduct } from "./Cart_Items";
import { Product } from "./Product";
import { Coupon } from "./ICoupon";
export class Cart {
    items: CProduct[] = [];
    coupon: Coupon[] = [];
    appliedCoupon: Coupon | null = null;

    addItem(product: Product, quantity: number) {
        if (quantity <= product.stock) {
            this.items.push({ product, quantity });
            return true;
        }
        return false;
    }
    removeItem(productId: string) {
        if (this.items.find(prd => prd.product.id === productId)) {
            this.items = this.items.filter(prd => prd.product.id !== productId);
            return true;
        }
        else
            return false;
    }
    updateQuantity(productId: string, quantity: number) {
        let prd = this.items.find(temp => temp.product.id === productId);
        if (prd) {
            prd.quantity += quantity;
            console.log("Update Successfully");
            return true;
        } else {
            return false;
        }
    }
    clearCart() {
        this.items.splice(0, this.items.length);
    }
    getSubTotal(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.quantity * item.product.price;
        }
        return total;
    }
    getItemCount(): number {
        let count = 0;
        for (const item of this.items) {
            count += item.quantity;
        }
        return count;
    }
    isValidCoupon(coupon: Coupon) {
        if (!coupon.isActive) return false;
        if (this.getSubTotal() < coupon.minOrderValue) return false;
        else return true;
    }
    applyCoupon(coupon: Coupon) {
        if (!this.isValidCoupon(coupon)) return false;
        else {
            this.appliedCoupon = coupon;
            return true;
        }
    }
    removeCoupon() {
        if (!this.appliedCoupon) return false;
        else {
            this.appliedCoupon = null;
            return true;
        }
    }
    getDiscount() {
        if (!this.appliedCoupon || !this.isValidCoupon(this.appliedCoupon)) return 0;
        else {
            if (this.appliedCoupon.discountType === "FIXED") {
                console.log("Your order had been reduce :" + this.appliedCoupon.value);
                return this.appliedCoupon.value;
            } else {
                console.log("Your order had been reduce :" + (100 - (this.appliedCoupon.value) / 100) + "%");
                return (100 - (this.appliedCoupon.value) / 100);
            }
        }
    }
    getTotal() {
        if (this.getDiscount() < 1 && this.getDiscount() > 0) {
            return this.getSubTotal() * this.getDiscount();
        } else
            return this.getSubTotal() - this.getDiscount();
    }
} 