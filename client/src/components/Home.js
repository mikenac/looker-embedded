
import React from 'react';
import { Container } from 'react-bootstrap';

const { REACT_APP_HOME_TEXT } = process.env;

export default class Home extends React.Component {

    render () {
        return (
            <Container fluid>
                <p>{ REACT_APP_HOME_TEXT ?? "Home is where the heart is." }</p>
            </Container>
        );
    }
}
