import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import ApiBase from '../../services/ApiBase';


const FacaParteMusico = () => {
  
  //senha
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [cidade, setCidade] = useState("");
  const [quadra, setQuadra] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [instrumento, setInstrumento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");


  function handleSubmit(event) {
      event.preventDefault();
      const novoMusico = {
          nome: nome,
          email: email,
          senha: senha,
          telefone: telefone,
          sexo: sexo,
          cidade: cidade,
          quadra: quadra,
          cep: cep,
          estado: estado,
          numero: numero,
          complemento: complemento,
          instrumento: instrumento,
          dataNascimento: dataNascimento,
          
      };
      addMusico(novoMusico);
    }
  
    function addMusico(props) {
      const envioMusico = {
          nome: `${props.nome}`,
          sexo: `${props.sexo}`,
          email: `${props.email}`,
          dataNascimento: `${props.dataNascimento}`,
          telefone: `${props.telefone}`,
          endereco: {
              cidade: `${props.cidade}`,
              quadra: `${props.quadra}`,
              estado: `${props.estado}`,
              cep: `${props.cep}`,
              numero: `${props.numero}`,
              complemento: `${props.complemento}`,
              },
          senha: `${props.senha}`,        
          instrumento: `${props.instrumento}`      
      };
      console.log(envioMusico);

      //mask
      
  
      ApiBase.post(`/musicos`, {envioMusico}).then((response) =>
          alert("Músico adicionado com sucesso!", window.location.reload(false))
        ).catch((error) => {
          console.error("Error: ", error);
        })
      }
  
  
  
  return (
    <>
    <br />
      <Container>
        <Row>
          <Col>
          <Card>
                  <Card.Header align="left">Novo Músico</Card.Header>
                  <Card.Body align="left">
                    <Card.Text>
                      <Form onSubmit={handleSubmit}>
                        <Container>
                          <Row>
                            <Col md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Nome"
                                  value={nome}
                                  onChange={(e) => setNome(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <FormControl
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup className="mb-3">
                                    
                                    <FormControl
                                        type={passwordShown ? "text" : "password"}
                                        value={senha}
                                        placeholder="Senha"
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <Button variant="outline-secondary" id="button-addon2" onClick={togglePassword}>
                                        Mostrar
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Telefone</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    name="telefone"
                                    type="text"
                                    placeholder="(00)00000-0000"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Instrumento</Form.Label>
                                <Form.Select aria-label="Default select example" value={instrumento}
                                  onChange={(e) => setInstrumento(e.target.value)}>
                                    <option>Selecione o Instrumento</option>
                                    <option value="Violino1">Violino 1</option>
                                    <option value="Trompete2">Trompete 1</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                  type="date"
                                  value={dataNascimento}
                                  onChange={(e) => setDataNascimento(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select aria-label="Default select example" value={sexo}
                                  onChange={(e) => setSexo(e.target.value)}>
                                    <option>Selecione o Sexo</option>
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Quadra</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Quadra"
                                  value={quadra}
                                  onChange={(e) => setQuadra(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Número"
                                  value={numero}
                                  onChange={(e) => setNumero(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Cidade"
                                  value={cidade}
                                  onChange={(e) => setCidade(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Estado"
                                  value={estado}
                                  onChange={(e) => setEstado(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="CEP"
                                  value={cep}
                                  onChange={(e) => setCep(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Complemento"
                                  value={complemento}
                                  onChange={(e) => setComplemento(e.target.value)}
                                />
                              </Form.Group>
                            </Col>

                            <br />
                            <Col md={12}>
                              <Button variant="primary" type="submit">
                                Enviar dados
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    orquestra muito mais que música ...
                  </Card.Footer>
                </Card>
          
          </Col>
        </Row>
      </Container>
                
              
    
    </>  
  )
}

export default FacaParteMusico