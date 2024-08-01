import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar variant="dark" expand="lg" >
            <Container>
                <Navbar.Brand href="#"><strong>Kasir App</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/menuList">Product</Nav.Link>
                        <NavDropdown title="Transaksi" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/laporan-transaksi">Laporan</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;