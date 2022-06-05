import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import Foto_1 from "../img/Foto_1.jpeg"
import Foto_2 from "../img/Foto_2.jpeg"
import Foto_3 from "../img/Foto_3.jpeg"
import Foto_4 from "../img/Foto_4.jpeg"

const Home = () => {
    

    return (
        <>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={6} align="justify" >  
                        <h5>Orquestra Sinfônica da Assembleia de Deus da Samambaia - OSADS</h5>
                        <br />

                        <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Foto_2}
                                alt="Orquestra OSADS"
                                />
                                
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Foto_1}
                                alt="Nipe Violinos"
                                />
                                
                            </Carousel.Item>
                            
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Foto_3}
                                alt="Nipe de Metais"
                                />
                                
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Foto_4}
                                alt="Nipe de Madeiras"
                                />
                                
                            </Carousel.Item>
                        </Carousel>
                        <br />
                        <h5>Conheça nossa redes sociais:</h5>

                    </Col>

                    <Col md={6} className='lead' align="justify">
                       
                                <p>A orquestra foi fundada pelo Maestro Leonardo Gomes em 2005, com estreia em setembro do mesmo ano, na Igreja Assembleia de Deus - ADTAG 316 da Samambaia Sul, pastoreada pelo amado pastor Ildenor Ferreira. Logo após a estreia da OSADS a igreja começou a ser pastoreada pelo o amado Pastor Saulo Gonçalves, que apoiou a orquestra durante 9 anos.</p>
                                <p>O grupo participa do Encontro Nacional de Bandas desde o 7° ENBO que aconteceu em Caldas novas – GO, desde então não faltou em nenhum encontro até o ano de 2012.</p>
                                <p>No ano de 2012 o maestro Leonardo Gomes deixou a orquestra, e em 2013 o maestro Uriel Silva Ferreira assumiu a orquestra para dar continuidade ao trabalho.</p>
                                <p>Em 2015 com a permissão de Deus e com a persistência e dedicação do Maestro Uriel, a orquestra gravou um DVD.</p>
                                <p>A OSADS já realizou cantatas de natal, musicais, viagens, dentre elas participações no Encontro de Bandas e Orquestras de Anicuns – GO, participou também de Encontros Regionais do DF e viagens missionárias, além de concertos anuais temáticos como: Concerto para Deus, Concerto da Harpa Cristã, Concerto no Cinema e Concerto de Aniversário da Orquestra. A Orquestra também realiza o trabalho missionário em hospitais, casa de recuperação, asilos, etc.</p>
                                <p>Atualmente a igreja está sendo pastoreada pelo amado pastor Jonas Gonçalves que também apoia a orquestra sem medir esforços.</p>
                                
                      
                    </Col>
                </Row>
            </Container>
            <br />
            <br />

        </>
    )
}

export default Home
