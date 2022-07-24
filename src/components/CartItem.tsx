import { Stack, Button } from "react-bootstrap";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

export function CartItem({ id, name, price, imgUrl, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={imgUrl}
        style={{
          width: "110px",
          height: "130px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <div className="me-auto">
        <h6 style={{ display: "inline-block", marginRight: "3px" }}>{name}</h6>
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: "0.8rem" }}>
            x{quantity}
          </span>
        )}
        <div className="text-muted" style={{ fontSize: "0.9rem" }}>
          <p>{formatCurrency(price)}</p>
        </div>
      </div>
      <p style={{ margin: "0" }}>{formatCurrency(price * quantity)}</p>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
