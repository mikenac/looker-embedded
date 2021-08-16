
import { Container } from "react-bootstrap";
import React from "react"
import { LookerEmbedSDK, LookerEmbedLook, LookerEmbedDashboard, LookerAuthConfig } from "@looker/embed-sdk";
import { createSignedUrl, LookerEmbedUser } from "../AuthUtils"

var LookerHost = process.env.REACT_APP_LOOKER_HOST;




export default class Dashboard extends React.Component {
    componentDidMount() {

        // CLIENT ID: Qr3F6ygKRMBmxk8rznG8
        // SECRET: WvXryyvRJdfzyw7M6QCBctw8
        //createSignedUrl()
        LookerEmbedSDK.init(LookerHost,
        {
            "url": "http://localhost:5000/auth",
            "headers": [],
            "params": [],
            withCredentials: false
        });
        LookerEmbedSDK.createDashboardWithId(this.props.match.params.id)
            .appendTo("#db")
            .withClassName('looker-embed')
            .withNext()
            .build()
            .connect()
            .catch((error) => {
                console.error('Connection error', error);
            });
    }

    render() {
        return (
            <Container id="db" />
            // <Container>
            //     <Container>
            //         <h1>Dashboard for {this.props.match.params.id}</h1>
            //         <h2>Target Looker Instance: {LookerHost}</h2>
            //     </Container>
            //     <Container id="db" />
            // </Container>
        );
    }
}
