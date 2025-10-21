import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, cart, updateQty }) {
  return (
    <div className="grid">
      {products.map(p => {
        const cartItem = cart.find(c => c._id === p._id);
        return (
          <ProductCard
            key={p._id}
            product={p}
            qty={cartItem ? cartItem.qty : 0}
            updateQty={updateQty}
          />
        );
      })}
    </div>
  );
}
