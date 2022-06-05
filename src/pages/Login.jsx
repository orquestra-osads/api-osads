import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Card, Col, Container, FloatingLabel, InputGroup, Row } from "react-bootstrap";
import ApiBase from "../services/ApiBase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && senha.length > 0;
  }

  const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
      setPasswordShown(!passwordShown);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      senha: senha
    }
    login(data)
  }

  const login = data => {

    console.clear();
    console.log(data);  
    
    ApiBase.post('/login', {data})
        .then((result) => {
          
          console.log(result)
          sessionStorage.setItem('_id', result.data.user._id)
          sessionStorage.setItem('token', result.data.token)
          sessionStorage.setItem('instrumento', result.data.user.instrumento)
          sessionStorage.setItem('_role', result.data.user._role)
          sessionStorage.setItem('email', result.data.user.email)
          console.log('Resultado: ', result.data);

          if (result.data.user._role === 'Musico'){
            window.location.reload(navigate('/partituras'))
            if (result.data.user.instrumento === 'Violino1'){
              sessionStorage.setItem('pasta', '1bHqYWKtmZlENRtiD140CHeOMt4-NW4q9')
            }
            else if (result.data.user.instrumento === 'Trompete2'){
              sessionStorage.setItem('pasta', '1N21JEvSL0z29Ag5XLOAJUvKV4kbtOKQF')
            }
          }
          else if (result.data.user._role === 'Admin'){
            window.location.reload(navigate('/orquestra/partituras'))
          }
          
        }).catch((error) => {
          alert(error.response.data.message)
        })
       
  }

  return (
    <>
      
      <Container>
        <br />
        
        <Row className="row d-flex justify-content-center">
            <Col className="col-md-6">
            <Card border="dark">
              <Card.Header>Login OSADS</Card.Header>
              <Card.Body>
          <br />

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel controlId="email" label="Email:" className="col-md-12">
                          <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                  </FloatingLabel>
          <br />
                                         
                          <div>
                            <InputGroup controlId="password" className="md-3">
                              <FloatingLabel controlId="senha" label="Senha:" className="w-75">
                                <Form.Control type={passwordShown ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha:"/>
                              </FloatingLabel>
                              <Button variant="outline-secondary" onClick={togglePassword} className="w-25">Mostrar</Button>
                            </InputGroup>
                          </div>
                      
          <br />
                  <Container>
                    <Row className="row d-flex justify-content-center">
                      <Col md={4}>
                        <div className="d-grid">
                          <Button type="submit" disabled={!validateForm()}>
                            Entrar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">Transformando vidas através do louvor!</Card.Footer>
            </Card>

            </Col>

        </Row>

      </Container>
    </>
    
  );
}
