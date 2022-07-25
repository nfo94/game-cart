import { Row, Col } from "react-bootstrap";

import { StoreItem } from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Store() {
  const { storedItems } = useShoppingCart();

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className={"g-3"}>
        {storedItems.map((item) => (
          <Col key={item.id}>
            <StoreItem
              id={item.id}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
            ></StoreItem>
          </Col>
        ))}
      </Row>
    </>
  );
}
