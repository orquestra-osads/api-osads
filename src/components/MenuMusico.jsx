import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



const MenuMusico = () => {

    const navigate = useNavigate();

    const email = sessionStorage.getItem('email')

    const logout = () => {

        sessionStorage.removeItem('_id')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('instrumento')
        sessionStorage.removeItem('_role')
        sessionStorage.removeItem('email')

        window.location.reload(navigate('/home'))        
        
    }


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
                                <Link className="nav-link" to="/partituras">Partituras</Link>
                                <Link className="nav-link" to="/agenda">Agenda</Link>
                                <Link className="nav-link" to="/contato">Contato</Link>
                                
                                
                            </Nav>
                            <Navbar.Text className="justify-content-end">
                                <Link className="nav-link" to="/profile">{email} |</Link> 
                            </Navbar.Text>
                            <button className='btn btn-dark' onClick={logout}>sair</button>

                        </Navbar.Collapse>                
                
            </Container>
        </Navbar>
  
            
        </>
    )
}

export default MenuMusico
