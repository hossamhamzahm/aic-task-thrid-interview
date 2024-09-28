import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./RootLayout.css"


const RootLayout: React.FC = () => {
    return <>
        <div>
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/annotations" href="#home">AIC</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/annotations" href="#home">Annotate</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>


            <main>
                <Container className="body-main-container">
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            <Outlet></Outlet>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    </>
}


export default RootLayout;