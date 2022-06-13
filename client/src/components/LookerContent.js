import React from "react";
import { Container } from "react-bootstrap";
import { LookerEmbedSDK } from "@looker/embed-sdk";

const { REACT_APP_LOOKER_AUTH_URL, REACT_APP_LOOKER_HOST } = process.env;

export default class LookerContent extends React.Component {
    // Simple component for displaying embedded looker content.
    // Will render for Dashboard, Looks, or Explore based on the input props from the route.
    componentDidMount() {

        // Initialize looker SDK and setup the auth end point
        LookerEmbedSDK.init(REACT_APP_LOOKER_HOST,
            {
                "url": REACT_APP_LOOKER_AUTH_URL,
                "headers": [],
                "params": [],
                withCredentials: true
            });

        // This is either (dashboard|look|explore), default dashboard
        const { contentType, match } = this.props;
        // The captures content ID from the original menu route e.g. dashboard/1
        const id = match.params.id;

        // render DB
        if (contentType === "dashboard") {
            LookerEmbedSDK.createDashboardWithId(id)
                .appendTo("#db")
                .withClassName('looker-embed')
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
        // Simple div for content
        return (
            <Container id="db" />
        );
    }
}

LookerContent.defaultProps = {
    contentType: 'dashboard'
}