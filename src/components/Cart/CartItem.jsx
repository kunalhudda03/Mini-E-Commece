export default function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="cart-item">
      <span>{item.name}</span>

      <input
        type="number"
        min="1"
        max={item.stock}
        value={item.qty}
        onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
      />

      <span>₹ {item.price * item.qty}</span>

      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}
