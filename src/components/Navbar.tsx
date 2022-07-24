import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";

import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { isOpen, openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-4">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={"/"} as={NavLink}>
            Home
          </Nav.Link>

          <Nav.Link to={"/store"} as={NavLink}>
            Store
          </Nav.Link>

          <Nav.Link to={"/about"} as={NavLink}>
            About
          </Nav.Link>
        </Nav>

        <Button
          onClick={openCart}
          active={isOpen}
          variant="outline-danger"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "5rem",
          }}
        >
          <BsCart style={{ width: "1.5rem", height: "1.5rem" }} />
          <div>{cartQuantity}</div>
        </Button>
      </Container>
    </NavbarBS>
  );
}
