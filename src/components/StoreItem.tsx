import { Card, Button } from "react-bootstrap";

import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const quantity = 0;

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body className="">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-3">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" variant="danger">
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
                <Button variant="outline-danger">-</Button>
                <div>
                  <span>{quantity}</span> in cart
                </div>
                <Button variant="outline-danger">+</Button>
              </div>
              <Button variant="danger" size="sm" className="mt-2">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
