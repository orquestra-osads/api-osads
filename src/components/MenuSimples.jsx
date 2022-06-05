import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'
import { Link } from "react-router-dom";


const MenuSimples = () => {

    return (
        <>  
        <Navbar bg="dark" variant="dark" expand='lg' sticky="top"> 
            <Container fluid>
                        <Navbar.Brand href={'/home'}>OSADS</Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" 
                                    style={{ maxHeight: '350px' }}
                                    navbarScroll
                                >
                                <Link className="nav-link" to="/home">Orquestra</Link>
                                <Link className="nav-link" to="/contato">Contato</Link>
                                <Link className="nav-link" to="/facaparte">Faça Parte</Link>
                                <Link className="nav-link" to="/login">Login</Link>

                            </Nav>
                            
                        </Navbar.Collapse>                
                
            </Container>
        </Navbar>
  
            
        </>
    )
}

export default MenuSimples
