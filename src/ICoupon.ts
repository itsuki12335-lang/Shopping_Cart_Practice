export interface Coupon {
    code: string;
    discountType: "PERCENT" | "FIXED"
    value: number;
    minOrderValue: number;
    isActive: boolean;
}