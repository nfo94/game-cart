import { Offcanvas, Stack } from "react-bootstrap";

import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

export function ShoppingCart() {
  const { isOpen, openCart, cartItems, storedItems, total } = useShoppingCart();
  const hasCartItems = cartItems.length > 0;

  return (
    <Offcanvas show={isOpen} onHide={openCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {hasCartItems &&
            cartItems.map((item) => {
              const itemFound = storedItems.find(
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
                  price={item.price}
                  imgUrl={itemFound.imgUrl}
                />
              );
            })}
          {hasCartItems && (
            <div className="ms-auto">
              <h5 style={{ display: "inline-block", marginRight: "5px" }}>
                Total:
              </h5>
              <span>{formatCurrency(total)}</span>
            </div>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
