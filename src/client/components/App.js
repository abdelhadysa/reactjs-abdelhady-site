/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CoverImage from 'Resources/img/branding/The Origami - Transparent Logo - Large.png'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'
import getGreetingTime from 'Client/utils/getGreetingTime'

export default function App() {
    const { t } = useTranslation()
    return (
        <Container>
            <Row className={'d-flex align-items-center'}>
                <Col>
                    <img width={'500px'} src={CoverImage} alt={process.env.WEBSITE_NAME} />
                </Col>
                <Col>
                    <h1>{process.env.WEBSITE_NAME}</h1>
                    <p>{t('greetings.greeting', { date: new Date(), context: getGreetingTime() })}</p>
                    <p>{t('notice', { date: DateTime.fromJSDate(new Date()).toFormat('yyyy'), websiteName: process.env.WEBSITE_NAME })}</p>
                </Col>
            </Row>
        </Container>
    )
}