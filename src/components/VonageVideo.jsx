import { Component, createElement } from "react";
import { OTSession, OTStreams } from "opentok-react";
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import { Helmet } from "react-helmet";

const OT = require('@opentok/client');

export class VonageVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            connected: false
        };

        this.sessionEvents = {
            sessionConnected: () => {
                console.info("Session connected = true")
                this.setState({ connected: true });
            },
            sessionDisconnected: () => {
                console.info("Session connected = false")
                this.setState({ connected: false });
            }
        };
    }

    onError = err => {
        this.setState({ error: `Failed to connect: ${err.message}` });
    };

    render() {
        let apiKey = null;
        let vonageSessionID = null;
        let token = null;


        console.info("Connected: " + this.state.connected);
        if (this.props.apiKey.value != undefined) {
            console.info("apiKey: " + this.props.apiKey.value);
            apiKey = this.props.apiKey.value;
        }
        if (this.props.vonageSessionID.value != undefined) {
            console.info("Session ID - value: " + this.props.vonageSessionID.value);
            vonageSessionID = this.props.vonageSessionID.value;
        }
        if (this.props.token.value != undefined) {
            console.info("Token - value: " + this.props.token.value);
            token = this.props.token.value;
        }

        if (apiKey != null) {
            return (
                <div>
                    <Helmet>
                        <script src="https://static.opentok.com/v2/js/opentok.min.js" type="text/javascript" />
                    </Helmet>
                    <OTSession
                        apiKey={apiKey}
                        sessionId={this.props.vonageSessionID.value}
                        token={this.props.token.value}
                        eventHandlers={this.sessionEvents}
                        onError={this.onError}
                    >
                        {this.state.error ? <div>{this.state.error}</div> : null}
                        <ConnectionStatus connected={this.state.connected} />
                        <Publisher />
                        <OTStreams>
                            <Subscriber />
                        </OTStreams>
                    </OTSession>
                </div>
            );
        }



    }
}

