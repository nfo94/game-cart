import { useEffect, useState } from "react";

import { Offcanvas, Stack } from "react-bootstrap";

import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface Item {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>([]);
  const { isOpen, openCart, cartItems } = useShoppingCart();

  useEffect(() => {
    fetch("/store")
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={openCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.length > 0 &&
            cartItems.map((item) => {
              const itemFound = items.find(
                (itemInStore) => itemInStore.id === item.id
              ) || {
                name: "",
                price: 0,
                imgUrl: "",
              };
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                  name={itemFound.name}
                  price={itemFound.price}
                  imgUrl={itemFound.imgUrl}
                />
              );
            })}
          <div></div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
