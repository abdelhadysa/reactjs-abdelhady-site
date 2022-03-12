import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CoverImage from 'Resources/img/branding/cover.png'

export default function App() {
    return (
        <Container>
            <Row className={'d-flex align-items-center'}>
                <Col>
                    <img width={'500px'} src={CoverImage} alt={process.env.WEBSITE_NAME} />
                </Col>
                <Col>
                    <h1>{process.env.WEBSITE_NAME}</h1>
                    <p>Welcome to the site!</p>
                </Col>
            </Row>
        </Container>
    )
}