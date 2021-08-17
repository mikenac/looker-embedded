import React from "react";
import { Container } from "react-bootstrap";
import { LookerEmbedSDK } from "@looker/embed-sdk";

const { REACT_APP_LOOKER_AUTH_URL, REACT_APP_LOOKER_HOST } = process.env;

export default class LookerContent extends React.Component {
    constructor(props) {
        super(props);

        LookerEmbedSDK.init(REACT_APP_LOOKER_HOST,
            {
                "url": "/auth",
                "headers": [],
                "params": [],
                withCredentials: false
            });
    }
    componentDidMount() {

        const { contentType, match } = this.props;
        const id = match.params.id;

        if (contentType === "dashboard") {
            LookerEmbedSDK.createDashboardWithId(id)
                .appendTo("#db")
                .withClassName('looker-embed')
                .withNext()
                .build()
                .connect()
                .catch((error) => {
                    console.error('Connection error', error);
                });
        }
        if (contentType === "look") {
            LookerEmbedSDK.createLookWithId(id)
                .appendTo("#db")
                .withClassName('looker-embed')
                .withNext()
                .build()
                .connect()
                .catch((error) => {
                    console.error('Connection error', error);
                });
        }
        if (contentType === "explore") {
            LookerEmbedSDK.createExploreWithId(id)
                .appendTo("#db")
                .withClassName('looker-embed')
                .withNext()
                .build()
                .connect()
                .catch((error) => {
                    console.error('Connection error', error);
                });
        } 
    }

    render() {
    
        return (
            <Container id="db" />
        );
    }
}

LookerContent.defaultProps = {
    contentType: 'dashboard'
}