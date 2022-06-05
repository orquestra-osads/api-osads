import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect } from "react";
import Acordion from "../../components/Acordion";
import ApiBase from "../../services/ApiBase";


const GerenciarAgenda = () => {
  const [eventis, setEventis] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    ApiBase.get('/events', {headers: {
      'Authorization' : `Bearer ${token}`
    }}).then((result) => {
      setEventis(result.data.events)
      
    }).catch((error) => {      
      console.log(error)
    })
  },[])

  const eventos = {
    events: eventis,
    description: 'Ensaio',
    color: "yellow",
    textColor: "black",
  };
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const excluir = (id) =>{
    console.log(id)
    const token = sessionStorage.getItem('token')
    ApiBase.delete(`/events/${id}`, {headers: {
      'Authorization' : `Bearer ${token}` }})
    .then((response) => alert(response.data.message, window.location.reload(false)))
    .catch((error)=>{
    console.error('Error: ', error)
    })  
  }


  //novo evento 
  const [title, setTitle] = useState("");
  const [data, setDate] = useState("");
  const [hora, setHora] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const testeEvento = {
      title: title,
      data: data,
      hora: `${hora}:00`
    }
    novoEvento(testeEvento)
  }

  function novoEvento (props){
    const envioEvento = {
      title: `${props.title}`, 
      date: `${props.data}T${props.hora}`
    }
    console.log(envioEvento)
    const token = sessionStorage.getItem('token')
    ApiBase.post(`/events`, {envioEvento},{headers: {
      'Authorization' : `Bearer ${token}` }}).then((response) => alert('Evento adicionado com sucesso!', window.location.reload(false)))
      .catch((error)=>{
      console.error('Error: ', error)
      })  


  }



  return (
    <>
    <br />
    <Container>
      <Row>
        <Col md={1} />
        
        <Col md={10}>
          <Acordion title="Adicionar Evento" body={
                  <Card>
                    <Card.Header>Novo Evento</Card.Header>
                    <Card.Body align="left">
                      <Card.Text>

                        <Form onSubmit={handleSubmit}>

                        <Container>
                          <Row>
                               
                                    <Col md={6}>
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Título Evento</Form.Label>
                                        <Form.Control type="text" placeholder="Nome Evento" value={title} onChange={(e) => setTitle(e.target.value)}/>                       
                                    </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control type="date" value={data} onChange={(e) => setDate(e.target.value)} />
                                      </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Control type="time" value={hora} onChange={(e) => setHora(e.target.value)}/>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <Button variant="primary" type="submit">
                                        Adicionar Evento
                                      </Button>
                                    </Col>

                          </Row>
                        </Container>

                        </Form>

                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">orquestra muito mais que música ...</Card.Footer>
                  </Card>
          }/>
          <br />

        </Col>
        <Col md={1} />
        <Col md={1} />

        <Col md={10}>
          
            <Acordion title="Eventos" body={
              <Table responsive striped bordered hover>
              <thead align='left'>
                <tr>
                  <th>Nome Evento</th>
                  <th>Data/Hora</th>
                  <th>Excluir</th>
                  
                </tr>
              </thead>
              <tbody align='left'>
                {eventis.map((files) => (
                  <tr key={files.id}>
                    <td>{files.title}</td>
                    <td>{files.date}</td>
                    <td>
                      <Button className="btn btn-danger" onClick={() => excluir(files._id)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </Table>
            }/>
          
          <br />

        </Col>
      </Row>
    </Container>

    
    <br />
      <Container>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <FullCalendar
              timeZone="UTC-3"
              locale="br"
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              eventContent={renderEventContent}
              events={eventos}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GerenciarAgenda;
