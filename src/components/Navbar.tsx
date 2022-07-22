import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";

export function Navbar() {
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
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
          variant="outline-danger"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "5rem",
          }}
        >
          <BsCart style={{ width: "1.5rem", height: "1.5rem" }} />
          <div>3</div>
        </Button>
      </Container>
    </NavbarBS>
  );
}
