import { Category } from "./Enum_Category";
export interface IProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: Category;
}