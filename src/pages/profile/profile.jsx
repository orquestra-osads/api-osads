import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Forms from '../../components/forms';
import ApiBase from '../../services/ApiBase';

const Profile = () => {

  const [detalhes, setDetalhes] = useState([]);
    useEffect(() => {
        const id = sessionStorage.getItem('_id')
        const token = sessionStorage.getItem('token')
        ApiBase.get(`/profile/${id}`, {headers: {
          'Authorization' : `Bearer ${token}`
        }}).then((result) => {
            console.log(result.data)
            setDetalhes(result.data.user)
        }).catch((error) => {      
          console.log(error)
        })
  },[])
  

  return (
    <>
    
        <br />
        <Container>
          <Row>
            <Col>

              {detalhes.nome && (
                <Forms Header={`Dados do Usuário`} 
                  nome={`${detalhes.nome}`} 
                  email={`${detalhes.email}`}
                  telefone={`${detalhes.telefone}`}
                  instrumento={`${detalhes.instrumento}`}
                  dataNascimento={`${detalhes.dataNascimento}`}
                  sexo={`${detalhes.sexo}`}
                  logradouro={`${detalhes.endereco.logradouro}`}
                  numero={`${detalhes.endereco.numero}`}
                  estado={`${detalhes.endereco.estado}`}
                  cidade={`${detalhes.endereco.cidade}`}
                  cep={`${detalhes.endereco.cep}`}
                  complemento={`${detalhes.endereco.complemento}`}
                  botão='Atualizar informações'
                  
                />
                )
              }
              <br />
              <Button variant="outline-danger">Alterar Senha</Button>
              
              <Button variant="outline-primary">Alterar Email</Button>


            </Col>

            
            
            
          </Row>
        </Container>
        
    
    </>
  )
}

export default Profile