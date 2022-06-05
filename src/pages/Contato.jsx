import React from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useNavigate } from "react-router";
import ApiBase from '../services/ApiBase';
import { mask, unMask } from 'remask'
import { useForm } from 'react-hook-form';



const Contato = () => {

    const { register, setValue, handleSubmit } = useForm()

    const navigate = useNavigate();

    function handleSubmit2(event) {
        novoEvento(event)
    }

    function novoEvento (props){
        const contato = props
        console.log(props)
        ApiBase.post(`/contato`, {contato})
        .then((response) => alert('Contato enviado! Aguarde e entraremos em contato.', navigate('/home')))
        .catch((error)=>{
            console.log(error)
            console.error('Error: ', error)
        })  

    }
    
    //mask + add value 
    function handleChange(event) {
        const name = event.target.name
        const mascara = event.target.getAttribute('mask')

        let valor = unMask(event.target.value)
        valor = mask(valor, mascara)

        setValue(name, valor)
    }
    
    
    
    return (
        <>
        <br />
            <Container>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Header>Entre em contato com a OSADS</Card.Header>
                            <Card.Body align="left">
                            <Card.Text>

                                <Form onSubmit={handleSubmit} >

                                <Container>
                                <Row>
                                    
                                            <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email:</Form.Label>
                                                <Form.Control type="email" {...register("email")} placeholder="examplo@email.com" />                       
                                            </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                            <Form.Label>Telefone:</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    type="text" 
                                                    {...register("telefone")} 
                                                    mask="(99) 99999-9999" 
                                                    onChange={handleChange}
                                                    placeholder="(00) 00000-0000"
                                                    required
                                                />
                                                </InputGroup>
                                            </Col>
                                            <Col md={12}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <FloatingLabel label="Mensagem">
                                                    
                                                    <Form.Control 
                                                        as="textarea" 
                                                        placeholder="Texto" 
                                                        {...register("message")} 
                                                        style={{ height: '100px' }}
                                                    />
                                                
                                                </FloatingLabel>
                                                
                                            </Form.Group>
                                            </Col>
                                            <Col>
                                                <Button variant="primary" type="submit" onClick={handleSubmit(handleSubmit2)} className="w-25">
                                                    Enviar
                                                </Button>
                                            </Col>

                                </Row>
                                </Container>

                                </Form>

                            </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">Transformando vidas através do louvor!</Card.Footer>
                        </Card>


                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default Contato
