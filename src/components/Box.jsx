import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Box = (props) => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Link to={props.link}><Card.Img variant="top" src={props.img} /></Link>                
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.text}</Card.Text>
                    <Link to={props.link}><Button variant="primary" >{props.botton}</Button></Link>        
                </Card.Body>
            </Card>
        </>
    )
}

export default Box
