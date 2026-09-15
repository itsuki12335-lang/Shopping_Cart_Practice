# 🛒 Shopping Cart — Learning Roadmap (TypeScript)

> **Mục tiêu**: Xây dựng hệ thống giỏ hàng mô phỏng thực tế, từ thêm sản phẩm đến thanh toán

---

## ✅ Phase 1 — Core Data Models

> **Mục tiêu**: Định nghĩa các kiểu dữ liệu và class cơ bản

### Bước 1: Interface & Enum nền tảng
- Interface `Product { id, name, price, stock, category }`
- Enum `Category { FOOD | ELECTRONICS | CLOTHING | OTHER }`
- Interface `CartItem { product, quantity }`

### Bước 2: Class `Product`
- Constructor nhận đủ thông tin sản phẩm
- `getPrice(): number`
- `isAvailable(): boolean` — kiểm tra `stock > 0`
- `reduceStock(quantity)` — trừ tồn kho khi mua

---

## ✅ Phase 2 — Shopping Cart Logic

> **Mục tiêu**: Quản lý giỏ hàng — thêm, xóa, cập nhật số lượng

### Bước 3: Class `Cart`
- `items: CartItem[]`
- `addItem(product, quantity)` → kiểm tra stock trước khi thêm
- `removeItem(productId)` → xóa khỏi giỏ
- `updateQuantity(productId, quantity)` → cập nhật số lượng
- `clearCart()` → xóa toàn bộ giỏ

### Bước 4: Tính tổng
- `getSubtotal(): number` — tổng tiền trước khuyến mãi
- `getItemCount(): number` — tổng số lượng sản phẩm

---

## ✅ Phase 3 — Discount & Coupon

> **Mục tiêu**: Áp dụng mã giảm giá và chính sách khuyến mãi

### Bước 5: Interface & Class `Coupon`
- Interface `Coupon { code, discountType, value, minOrderValue, isActive }`
- `discountType: "PERCENT" | "FIXED"` — % hoặc số tiền cố định
- Ví dụ: `SAVE10` giảm 10%, `FLAT50K` giảm 50,000đ

### Bước 6: Áp dụng Coupon vào Cart
- `applyCoupon(code): boolean` — kiểm tra hợp lệ và áp dụng
- `removeCoupon()` — hủy mã giảm giá
- `getDiscount(): number` — tính số tiền được giảm
- `getTotal(): number` — tổng sau khuyến mãi

---

## ✅ Phase 4 — Checkout & Order

> **Mục tiêu**: Hoàn tất đơn hàng và tạo hóa đơn

### Bước 7: Interface `Order`
- `Order { orderId, items, subtotal, discount, total, createdAt }`
- `OrderStatus: "PENDING" | "CONFIRMED" | "CANCELLED"`

### Bước 8: Class `Checkout`
- `checkout(cart, coupon?): Order` — tạo đơn hàng từ giỏ
- Kiểm tra stock còn đủ không trước khi xác nhận
- Trừ tồn kho sau khi order thành công
- `cancelOrder(orderId): boolean`

---

## ✅ Phase 5 — Product Catalog

> **Mục tiêu**: Quản lý danh mục sản phẩm

### Bước 9: Class `ProductCatalog`
- `products: Product[]`
- `addProduct(product)` / `removeProduct(id)`
- `findById(id): Product | null`
- `findByCategory(category): Product[]`
- `searchByName(keyword): Product[]` — tìm theo từ khóa

---

## 🗂️ Cấu trúc file gợi ý

```
ShoppingCart/
├── ShoppingCart_Roadmap.md    ← file này
├── src/
│   ├── Product.ts             ← class Product, enum Category
│   ├── Cart.ts                ← class Cart, interface CartItem
│   ├── Coupon.ts              ← interface Coupon, class CouponService
│   ├── Order.ts               ← interface Order, enum OrderStatus
│   ├── Checkout.ts            ← class Checkout
│   └── ProductCatalog.ts      ← class ProductCatalog
├── test/
│   ├── Product.test.ts
│   ├── Cart.test.ts
│   ├── Coupon.test.ts
│   └── Checkout.test.ts
└── main.ts                    ← chạy thử toàn bộ flow
```

---

## 🎯 Flow thực tế mô phỏng

```
1. Duyệt catalog  →  tìm sản phẩm
2. addItem()       →  thêm vào giỏ
3. applyCoupon()   →  nhập mã giảm giá
4. getTotal()      →  xem tổng tiền
5. checkout()      →  tạo đơn hàng, trừ stock
```

---

> 💡 **Tip**: Làm theo thứ tự Phase — Phase 1 & 2 là nền tảng, Phase 3 trở đi là nâng cao dần.
> Nhớ viết test cho từng class trước khi sang class tiếp theo!
