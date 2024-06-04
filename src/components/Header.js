import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';

export default function Header() {
    return (
        <Navbar expand="lg" className="header">
            <Navbar.Brand href="#" className="header-brand">AllTickets</Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link href="/" className="header-link">Квитки</Nav.Link>
                <Nav.Link href="/posts" className="header-link">Блог</Nav.Link>
            </Nav>
        </Navbar>
    );
}
