import { Offcanvas } from "react-bootstrap";

export function ShoppingCart() {
  return (
    <Offcanvas open={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
}
