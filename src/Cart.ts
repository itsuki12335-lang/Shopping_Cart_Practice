import { CProduct } from "./Cart_Items";
import { Product } from "./Product";
export class Cart {
    items: CProduct[] = [];

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

} 