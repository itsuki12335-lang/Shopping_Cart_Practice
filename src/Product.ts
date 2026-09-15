import { Category } from "./Enum_Category";
import { IProduct } from "./Interface_Product"
export class Product implements IProduct {
    public id: string;
    public name: string;
    public price: number;
    public stock: number;
    public category: Category;

    constructor(id: string, name: string, price: number, stock: number, category: Category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
    getPrice() {
        return this.price;
    }
    isAvailable(): boolean {
        if (this.stock <= 0) {
            return false;
        } else
            return true;
    }
    reduceStock(quantity: number) {
        if (this.stock < quantity) {
            console.log("Failed");
            return false
        } else {
            console.log("Successfully");
            this.stock -= quantity;
            return true;
        }
    }
}