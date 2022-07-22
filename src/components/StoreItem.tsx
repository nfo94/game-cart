import { Card } from "react-bootstrap";

import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  return (
    <Card>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body className="">
        <Card.Title className="d-flex justify-content-between mb-4">
          <span>{name}</span>
          <span>{formatCurrency(price)}</span>
        </Card.Title>
        <div>test</div>
      </Card.Body>
    </Card>
  );
}
