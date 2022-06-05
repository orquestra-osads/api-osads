import React, { useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ApiUpload from "../../services/ApiUpload";

const GerentePartitura = () => {

  const [state, setState] = useState({ selectedFile: null });
  const [detalhes, setDetalhes] = useState([])
  const [id, setId] = useState([])
  const [folderID, setFolderID] = useState([])
  
  
  //modal 
  const [show, setShow] = useState(false);
  const handleClose = () => {setDetalhes([0]); setId([0]); setFolderID([0]); setShow(false)};
  const handleShow = (props) => {
    const pasta = {folder: `${props}`} //1bHqYWKtmZlENRtiD140CHeOMt4-NW4q9
    console.log(pasta)
    setFolderID(props)
    ApiUpload.post('/upload/list', {pasta}).then((result) => {
      setDetalhes(result.data)
      console.log(result.data)
    }).catch((error) => {      
      console.log(error)
    })
    setShow(true);
    setId(pasta);
  };

  //validar se tem algum arquivo no form
  function validateForm() {
    return  state.selectedFile != null;
  }
  
   
  //fazendo uplado de arquivos
  const onFileChange = (event) => { 
    setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  const onFileUpload = () => { 
    const folderId = id
    console.log(folderId.folder)
    const formData = new FormData(); 
    formData.append( 
      "myFile", 
      state.selectedFile,
      state.selectedFile.name
    );
    
    ApiUpload.post(`/upload/folder/${folderId.folder}`, formData).then((result) => {
      console.log('Success: ', result, handleShow(folderID))
    }).catch((error) => {      
      console.log(error)
    })
    
  }; 

  //excluindo arquivos
  const excluir = (id) =>{
    
      fetch(`https://orquestra-api-upload.herokuapp.com/file/${id}`, {method: 'DELETE'})
      .then((response) => response.json(handleShow(folderID)))
      .then((result)=>{alert(result)})
      .catch((error)=>{
      console.error('Error: ', error)
    })
    
  }

  return (
    <>
      
      <p>Maestro</p>
      
    <br />
      {//teste modal 
      }   
    <>
      <Container>
        <Row>
          {
            //violino
          }
          <CardGroup>

          <Col md={4}>

            <Card border='dark' className='mb-3' style={{ width: "18rem" }}>
                <Card.Img 
                  variant="top" 
                  className="test"
                  onClick={() => handleShow('1bHqYWKtmZlENRtiD140CHeOMt4-NW4q9')} 
                  src="https://www.superprof.com.br/blog/wp-content/uploads/2018/11/encontrar-professor-de-violino-1060x707.jpg"
                  style={{height:'200px'}}
                />               
                <Card.Body>
                       <Button
                          className="bt bt-danger"
                          variant="primary"
                          onClick={() => handleShow('1bHqYWKtmZlENRtiD140CHeOMt4-NW4q9')}
                        >
                          Partituras Violino
                      </Button>
              </Card.Body>
            </Card>
          </Col>
          {
            //trompete
          }
          <Col md={4}>
            <Card border='dark' className='mb-3' style={{ width: "18rem" }}>
                <Card.Img variant="top" style={{height:'200px'}} onClick={() => handleShow('1N21JEvSL0z29Ag5XLOAJUvKV4kbtOKQF')} src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJ1bXBldHxlbnwwfHwwfHw%3D&w=1000&q=80"/>               
                <Card.Body>
                    
                    
                       <Button
                          className="bt bt-danger"
                          variant="primary"
                          onClick={() => handleShow('1N21JEvSL0z29Ag5XLOAJUvKV4kbtOKQF')}
                          
                        >
                          Partituras Trompete
                      </Button>
              </Card.Body>
            </Card>
          
          </Col>
          </CardGroup>

        </Row>
      </Container>
    </>
    <Modal show={show} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Partituras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Col md={10} >
                        <input type="file" className="form-control" onChange={onFileChange}/>
                      </Col>
                      <Col md={2} align='right' className="d-grid gap-2">                                    
                          <Button className="btn btn-primary" onClick={() => onFileUpload(folderID)} disabled={!validateForm()}>Enviar</Button>                                         
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          
         
            <Container>
                  <>
                  <br />
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Download</th>
                          <th>Visualizar</th>
                          <th>Excluir</th>
                        </tr>
                      </thead>
                      <tbody align='center'>
                        {detalhes.map((files) => (
                          <tr>
                            <td>{files.name}</td>
                            <td>
                              <a href={`${files.webContentLink}`}><Button className="btn btn-success">DownLoad</Button></a>
                            </td>
                            <td>
                              <a href={`${files.webViewLink}`}><Button className="btn btn-primary">Vizualizar</Button></a>
                            </td>
                            <td>
                              <Button className="btn btn-danger" onClick={() => excluir(files.id)}>Excluir</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>



          
      
    </>
  );
};

export default GerentePartitura;
