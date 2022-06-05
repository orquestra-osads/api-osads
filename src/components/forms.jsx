import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import ApiBase from '../services/ApiBase';
import apiCep from '../services/ApiCep';
import { mask, unMask } from 'remask'
import { useForm } from 'react-hook-form';


const Forms = (props) => {

    console.log(props)
    
    const id = sessionStorage.getItem('_id')
    const [nome, setNome] = useState(props.nome);
    const [email, setEmail] = useState("");
    const senha = props.senha
    const [telefone, setTelefone] = useState(props.telefone);
    const [sexo, setSexo] = useState(props.sexo);
    const [cidade, setCidade] = useState(props.cidade);
    const [logradouro, setLogradouro] = useState(props.logradouro)
    const [cep, setCep] = useState(props.cep);
    const [estado, setEstado] = useState(props.estado);
    const [numero, setNumero] = useState(props.numero);
    const [complemento, setComplemento] = useState(props.complemento);
    const [instrumento, setInstrumento] = useState(props.instrumento);
    const [dataNascimento, setDataNascimento] = useState(props.dataNascimento);

    
    //atualizar informações 

    function handleSubmit(event) {
        event.preventDefault();
        const novoMusico = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            sexo: sexo,
            cidade: cidade,
            cep: cep,
            logradouro: logradouro,
            estado: estado,
            numero: numero,
            complemento: complemento,
            instrumento: instrumento,
            dataNascimento: dataNascimento,
            
        };
        putMusico(novoMusico);
      }
    
      function putMusico(props) {

        const token = sessionStorage.getItem('token')

        const envioMusico = {
            nome: `${props.nome}`,
            sexo: `${props.sexo}`,
            email: `${props.email}`,
            dataNascimento: `${props.dataNascimento}`,
            telefone: `${props.telefone}`,
            endereco: {
                cidade: `${props.cidade}`,
                logradouro: `${props.logradouro}`,
                estado: `${props.estado}`,
                cep: `${props.cep}`,
                numero: `${props.numero}`,
                complemento: `${props.complemento}`,
                },
            senha: `${props.senha}`,        
            instrumento: `${props.instrumento}`      
        };
        console.log(envioMusico);
    
        ApiBase.put(`/musicos/${id}`, {envioMusico}, {headers: {
          'Authorization' : `Bearer ${token}` }}).then((response) =>
            alert("Dados atualizados   com sucesso!", window.location.reload(false))
          ).catch((error) => {
            console.error("Error: ", error);
          })
        }

        //mask
        const { register, setValue } = useForm()
        function handleChange(event) {
          const name = event.target.name
          const mascara = event.target.getAttribute('mask')

          let valor = unMask(event.target.value)
          valor = mask(valor, mascara)

          setValue(name, valor)
        }

        //CEP

       function handleCep(event) {

        const valor = unMask(event.target.value)

        apiCep.get(`/ws/${valor}/json/`).then(resultado => {
            const endereco = resultado.data
            console.log(endereco)

            setValue('logradouro', endereco.logradouro)
            setValue('complemento', endereco.complemento)
            setValue('uf', endereco.uf)
            setValue('cidade', endereco.localidade)
            setValue('bairro', endereco.bairro)
        })
      }    


  return (
    
                <Card>
                  <Card.Header align="left">{props.Header}</Card.Header>
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
                                  placeholder="nome"
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
                                    value={props.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            
                            <Col md={3}>
                                <Form.Label>Telefone</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    type="text"
                                    placeholder="(00)00000-0000"
                                    aria-label="Email"
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
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                </Form.Select>
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
                                      {...register("cep")}
                                      value={cep}
                                      mask="99.999-999"
                                      placeholder='CEP'
                                      onChange={handleChange}
                                      onBlur={handleCep}
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
                            <Col md={9}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Logradouro</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={logradouro}
                                    placeholder="Logradouro"
                                    {...register("logradouro")}
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
                                {props.botão}
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Transformando vidas através do louvor!
                  </Card.Footer>
                </Card>
              
  )
}

export default Forms