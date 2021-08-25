
// main navigation bar, the arrays below represent valid content in the looker system
// TODO: populate these arrays by calling the looker API

import {  Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Dashboards = [1, 2, 3, 4, 8].map((db, idx) => (
    <NavDropdown.Item key={idx} href={`/dashboard/${db}`}>Dashboard {db}</NavDropdown.Item>
  ));

const Looks = [3, 2, 7, 6, 8].map((db, idx) => (
    <NavDropdown.Item key={idx} href={`/look/${db}`}>Look {db}</NavDropdown.Item>
  ));

  const Explores = [1, 2, 3, 4, 5].map((db, idx) => (
    <NavDropdown.Item key={idx} href={`/explore/${db}`}>Explore {db}</NavDropdown.Item>
  ));

export const NavigationBar = () => (
<Navbar bg="dark" variant="dark" sticky="top">
    <Nav className="justify-content-start">
        <Navbar.Brand href="/">Analytics</Navbar.Brand>
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Dashboards" id="basic-nav-dropdown-dashboards">
        {Dashboards}
        </NavDropdown>
        <NavDropdown title="Looks" id="basic-nav-dropdown-looks">
        {Looks}
        </NavDropdown>
        <NavDropdown title="Explores" id="basic-nav-dropdown-explores">
        {Explores}
        </NavDropdown>
    </Nav>
    <Nav className="ml-auto">
        <Nav.Link href="/logout">Logout</Nav.Link>
    </Nav>
</Navbar>
);