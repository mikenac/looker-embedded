import React from "react";
import { Container } from "react-bootstrap";
import { LookerEmbedSDK } from "@looker/embed-sdk";

const { REACT_APP_LOOKER_AUTH_URL, REACT_APP_LOOKER_HOST } = process.env;

export default class LookerContent extends React.Component {
    
    componentDidMount() {

        LookerEmbedSDK.init(REACT_APP_LOOKER_HOST,
            {
                "url": REACT_APP_LOOKER_AUTH_URL,
                "headers": [],
                "params": [],
                withCredentials: true
            });

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
        else if (contentType === "look") {
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
        else if (contentType === "explore") {
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
        else {
            console.log(`Invalid content type: ${contentType}`);
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