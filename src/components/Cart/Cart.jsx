import { useMemo } from "react";
import CartItem from "./CartItem";

export default function Cart({ cart, onQtyChange, onRemove }) {
  const { totalItems, totalPrice } = useMemo(() => {
    return {
      totalItems: cart.reduce((s, i) => s + i.qty, 0),
      totalPrice: cart.reduce((s, i) => s + i.qty * i.price, 0),
    };
  }, [cart]);

  if (cart.length === 0) {
    return <p className="empty">Cart is empty</p>;
  }

  return (
    <div className="cart">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQtyChange={onQtyChange}
          onRemove={onRemove}
        />
      ))}

      <hr />

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹ {totalPrice}</p>
    </div>
  );
}
