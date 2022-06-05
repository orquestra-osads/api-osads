import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import Acordion from "../../components/Acordion";
import Forms from "../../components/forms";
import ApiBase from "../../services/ApiBase";

const GerenteMusicos = () => {
    
    //Listando músicos
    const [musicos, setMusicos] = useState([]);
    const [novosMusicos, setNovosMusicos] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        ApiBase.get('/musicos', {headers: {
          'Authorization' : `Bearer ${token}`
        }}).then((result) => {
            console.log(result.data.musicos)
            setMusicos(result.data.musicos)
        }).catch((error) => {      
            console.log(error)
        })
        ApiBase.get('/forms', {headers: {
          'Authorization' : `Bearer ${token}`
        }}).then((result) => {
            console.log(result.data.users)
            setNovosMusicos(result.data.users)
        }).catch((error) => {      
            console.log(error)
        })
      },[])
  
  //modal 
  const [show, setShow] = useState(false);
  const [detalhes, setDetalhes] = useState([])

  const handleClose = () => {
    setShow(false) 
    setDetalhes(0)
  }
  const handleShow = (props) => {
    const id = props
    console.log(id)
    const token = sessionStorage.getItem('token')
    ApiBase.get(`/musicos/${id}`, {headers: {
        'Authorization' : `Bearer ${token}` }})
        .then((response) => {
            console.log(response.data.musico)
            setDetalhes(response.data.musico)
        })
        .catch((error)=>{
        console.error('Error: ', error)
        })  
    setShow(true);
  }
  const handleShow2 = (props) => {
    const id = props
    console.log(id)
    const token = sessionStorage.getItem('token')
    ApiBase.get(`/forms/${id}`, {headers: {
        'Authorization' : `Bearer ${token}` }})
        .then((response) => {
            console.log(response.data.user)
            setDetalhes(response.data.user)
        })
        .catch((error)=>{
        console.error('Error: ', error)
        })  
    setShow(true);
  }
  
  
  //novo músico
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
    console.log(props)
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

    ApiBase.post(`/musicos`, {envioMusico}).then((response) =>
        alert("Músico adicionado com sucesso!", window.location.reload(false))
      ).catch((error) => {
        console.error("Error: ", error);
      })
    }

    //excluir músico
    const excluir = (id) =>{
        console.log(id)
        const token = sessionStorage.getItem('token')
        ApiBase.delete(`/musicos/${id}`, {headers: {
          'Authorization' : `Bearer ${token}` }})
        .then((response) => alert(response.data.message, window.location.reload(false)))
        .catch((error)=>{
        console.log(error)
        })  
      }


    //aprovar músico

    function aprovarMusico(props) {

      const id = props
      const token = sessionStorage.getItem('token')
      ApiBase.get(`/forms/${id}`, {headers: {
          'Authorization' : `Bearer ${token}` }})
          .then((response) => {
              setDetalhes(response.data.user)
              const envioMusico = {
                nome: `${response.data.user.nome}`,
                sexo: `${response.data.user.sexo}`,
                email: `${response.data.user.email}`,
                dataNascimento: `${response.data.user.dataNascimento}`,
                telefone: `${response.data.user.telefone}`,

                endereco: {
                  cidade: `${response.data.user.endereco.cidade}`,
                  quadra: `${response.data.user.endereco.quadra}`,
                  estado: `${response.data.user.endereco.estado}`,
                  cep: `${response.data.user.endereco.cep}`,
                  numero: `${response.data.user.endereco.numero}`,
                  complemento: `${response.data.user.endereco.complemento}`
                },
                
                senha: `${response.data.user.senha}`,        
                instrumento: `${response.data.user.instrumento}`      
            };
            ApiBase.post(`/musicos`, {envioMusico}).then((response) =>
              alert("Músico adicionado com sucesso!", window.location.reload(false)),
              ApiBase.delete(`/forms/${id}`, {headers: {
                'Authorization' : `Bearer ${token}` }}).then((response) => {console.log(response)}).catch((error) => {console.log(error)})
            ).catch((error) => {
              console.error("Error: ", error);
            })

          })
          .catch((error)=>{
          console.error('Error: ', error)
          }) 
      
      }

      //reprovar músico

      function reprovarMusico(props) {
        const id = props
        const token = sessionStorage.getItem('token')

        ApiBase.delete(`/forms/${id}`, {headers: {
          'Authorization' : `Bearer ${token}` }}).then((response) => 
           alert(response.data.message, window.location.reload(false)))
          .catch((error)=>{
          console.log(error)})

      }



  return (
    <>
      <br />
      <p>Gerente de Músicos</p>
      <br />
      <Container>
        <Row>
          <Col>
            
            <Acordion 
              title="Lista de Músicos da OSADS" body={
                <Table responsive striped bordered hover>
                <thead align='left'>
                  <tr>
                    <th>Nome</th>
                    <th>Instrumento</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Vizualizar</th>
                    
                  </tr>
                </thead>
                <tbody align='left'>
                  {musicos.map((files) => (
                    <tr key={files.id}>
                      <td>{files.nome}</td>
                      <td>{files.instrumento}</td>
                      <td>{files.telefone}</td>
                      <td>{files.email}</td>
                      <td>
                        <Button className="btn btn-success" onClick={() => handleShow(`${files._id}`)}>Visualizar</Button>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
                </Table>
            }/>
              <br />
            <Acordion 
              title="Novos músicos" body={
              <Table responsive striped bordered hover>
              <thead align='left'>
                <tr>
                  <th>Nome</th>
                  <th>Instrumento</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Vizualizar</th>
                  <th>Aprovar Músico</th>
                  <th>Excluir Músico</th>
                  
                </tr>
              </thead>
              <tbody align='left'>
                {novosMusicos.map((files) => (
                  <tr key={files.id}>
                    <td>{files.nome}</td>
                    <td>{files.instrumento}</td>
                    <td>{files.telefone}</td>
                    <td>{files.email}</td>
                    <td>
                      <Button className="btn btn-success" onClick={() => handleShow2(`${files._id}`)}>Visualizar</Button>
                    </td>
                    <td>
                      <Button className="btn btn-secundary" onClick={() => aprovarMusico(`${files._id}`)}>Aprovar</Button>
                    </td>
                    <td>
                      <Button className="btn btn-danger" onClick={() => reprovarMusico(`${files._id}`)}>Excluir</Button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
              </Table>

            }/>

          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Dados Músico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detalhes._id && (
            <Forms onSubmit={handleSubmit} Header={`${detalhes.nome}`} 
            nome={`${detalhes.nome}`} 
            email={`${detalhes.email}`}
            senha={`${detalhes.senha}`}
            telefone={`${detalhes.telefone}`}
            instrumento={`${detalhes.instrumento}`}
            dataNascimento={`${detalhes.dataNascimento}`}
            sexo={`${detalhes.sexo}`}
            quadra={`${detalhes.endereco.quadra}`}
            numero={`${detalhes.endereco.numero}`}
            estado={`${detalhes.endereco.estado}`}
            cidade={`${detalhes.endereco.cidade}`}
            cep={`${detalhes.endereco.cep}`}
            complemento={`${detalhes.endereco.complemento}`}
            botão='Atualizar informações'

            />
            )
          }
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="danger" onClick={() => excluir(`${detalhes._id}`)}>
            Excluir Músico
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GerenteMusicos;
