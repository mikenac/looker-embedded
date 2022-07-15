
// main navigation bar, the arrays below represent valid content in the looker system
// TODO: populate these arrays by calling the looker API

import {  Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Dashboards = [31,34,36,37,39,40,43,59].map((db, idx) => (
    <NavDropdown.Item key={idx} href={`/dashboard/${db}`}>Dashboard {db}</NavDropdown.Item>
  ));

export const NavigationBar = () => (
<Navbar bg="dark" variant="dark" sticky="top">
    <Nav className="justify-content-start">
        <Navbar.Brand href="/">Analytics</Navbar.Brand>
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="Dashboards" id="basic-nav-dropdown-dashboards">
        {Dashboards}
        </NavDropdown>
    </Nav>
    <Nav className="ml-auto">
        <Nav.Link href="/logout">Logout</Nav.Link>
    </Nav>
</Navbar>
);