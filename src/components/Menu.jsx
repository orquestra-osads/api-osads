import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const Menu = () => {

    const navigate = useNavigate();


    const email = sessionStorage.getItem('email')

    const logout = () => {

        sessionStorage.removeItem('_id')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('instrumento')
        sessionStorage.removeItem('_role')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('pasta')


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
                                    <Link className="nav-link" to="/contato">Contato</Link>
                                    <Link className="nav-link" to="/agenda">Agenda</Link>
                                    <Link className="nav-link" to="/facaparte">Faça Parte</Link>

                           
                                    <NavDropdown title="Gerencie" id="basic-nav-dropdown">

                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/partituras">Partituras</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/contatos">Caixa de Entrada</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/inventario">Inventário</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/agenda">Agenda</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/musicos">Músicos</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link className='dropdown-item' to="/orquestra/alunos">Alunos</Link></NavDropdown.Item>

                                    </NavDropdown>
                                    
                                </Nav>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
  
                                    <Navbar.Text className="justify-content-end">
                                        <Link className="nav-link" to="/profile">{email} |</Link> 
                                    </Navbar.Text>
                                    <button className='btn btn-dark' onClick={logout}>sair</button>

                                </Nav>

                        </Navbar.Collapse>                
                
            </Container>
        </Navbar>
  
            
        </>
    )
}

export default Menu
