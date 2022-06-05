import React, { useState } from 'react'
import { Button, Form, Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const PreCadastroMusico = () => {
    
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState("");
    const [senha1, setSenha1] = useState("");
    const navigate = useNavigate();


    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
        event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else{
        setValidated(true)
        novoEvento(event)
      }
      setValidated(true)

        
    };

    function novoEvento (props){

        if (senha === senha1){
            const pre = {
                email: email,
                senha: senha
            }
            navigate('/teste2', {state: {pre}})
        }
        else{
            alert('Senhas Diferentes', window.location.reload(false))
        }
    }

    
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
  
  
    return (
        <>  
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={4} />
                    <Col md={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Insira o Email </Form.Label>
                                <FormControl required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                                <Form.Control.Feedback type="invalid">
                                    Por favor insira o email corretamente. 
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            </Row>
                            <Row className="mb-3">
                            <Form.Group controlId="validationCustom03">
                                <Form.Label>Senha</Form.Label>
                                <FormControl type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor insira a senha.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="validationCustom03">
                                <Form.Label>Inserir novamente a senha</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl 
                                        type={passwordShown ? "text" : "password"}
                                        onChange={(e) => setSenha1(e.target.value)} 

                                        placeholder="Repetir Senha" required />
                                        
                                        <Button variant="outline-secondary" id="button-addon2" onClick={togglePassword} >
                                            Mostrar
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            Repita a senha novamente.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                
                                
                                
                            </Form.Group>

                            
                            </Row>
                            
                            <Button type="submit" onChange={handleSubmit}>Cadastrar</Button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>
            
        </>
  )
}

export default PreCadastroMusico


