import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { StoreItem } from "../components/StoreItem";

interface Game {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function Store() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("/store")
      .then((response) => response.json())
      .then((json) => setGames(json));
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className={"g-3"}>
        {games.map((item) => (
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
