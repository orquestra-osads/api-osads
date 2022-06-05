import React from 'react'
import { Accordion } from 'react-bootstrap'

const Acordion = (props) => {
    return (
        <>
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey={props.key} onClick={props.click}>
                <Accordion.Header>{props.title}</Accordion.Header>
                <Accordion.Body>
                    {props.body}
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            
        </>
    )
}

export default Acordion
