import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const FacaParte = () => {
    const navigate = useNavigate();

    
    return (
        <>
            <br />
            <Container>
                <Row>
                    <Col md={6}>
                        <Card border="dark">
                            <Card.Header>Estude música</Card.Header>
                            <Card.Img variant="top" src="https://blog.fritzdobbert.com.br/wp-content/uploads/2016/12/Musica-Reparadora1.jpg" />
                            <Card.Body>
                                <Card.Title>Aprenda com os melhores professores</Card.Title>
                                <Card.Text>
                                Tenha aulas teoricas e prática de música
                                </Card.Text>
                                <Button onClick={() => navigate('/facaparte/aluno')} className='btn btn-danger'>Venha estudar</Button>      
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card border="dark">
                            <Card.Header>Faça parte da orquestra</Card.Header>
                            <Card.Img variant="top" src="https://theatromunicipal.org.br/wp-content/uploads/2019/09/OER_Noticias-970x647.jpg" />
                            <Card.Body>
                                <Card.Title>Contribua com essa obra</Card.Title>
                                <Card.Text>
                                    Traga seu instrumento e venha fazer parte desta jornada
                                </Card.Text>
                                <Button onClick={() => navigate('/facaparte/musico')} className='btn btn-success'>Venha tocar</Button>      

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FacaParte;
