import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "./NavigationBar.css";

const NavigationBar: React.FC = () => {
  return (
    <Container fluid className="bg-primary mx-0 px-0 w-full">
      <Navbar style={{ maxWidth: "800px" }} color="primary" expand="lg" className="mx-auto">
        <Container>
          <Navbar.Brand href="/">Budgetizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="w-full" id="basic-navbar-nav">
            <Nav className="d-flex w-full justify-content-between">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/overview">Overview</Nav.Link>
              <Nav.Link href="/calendar">Calendar</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => alert("logged out")} href="/">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
