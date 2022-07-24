import { Card, Button } from "react-bootstrap";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="250px"
        className="mt-4"
        style={{ objectFit: "contain" }}
      />

      <Card.Body className="">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>

        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              variant="danger"
              onClick={() => increaseItemQuantity(id)}
            >
              Add to cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  variant="outline-danger"
                  onClick={() => decreaseItemQuantity(id)}
                >
                  -
                </Button>

                <div>
                  <span>{quantity}</span> in cart
                </div>

                <Button
                  variant="outline-danger"
                  onClick={() => increaseItemQuantity(id)}
                >
                  +
                </Button>
              </div>

              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
