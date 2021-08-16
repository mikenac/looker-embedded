
import {  Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Dashboards = [1, 2, 3, 4, 5].map((db, idx) => (
    <NavDropdown.Item key={idx} href={`/dashboard/${db}`}>Dashboard {db}</NavDropdown.Item>
  ));

export const NavigationBar = () => (
<Navbar bg="dark" variant="dark" sticky="top">
    <Nav className="justify-content-start">
        <Navbar.Brand href="/">Analytics</Navbar.Brand>
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Dashboards" id="basic-nav-dropdown">
        {Dashboards}
        </NavDropdown>
    </Nav>
    <Nav className="ml-auto">
        <Nav.Link href="/logout">Logout</Nav.Link>
    </Nav>
</Navbar>
);