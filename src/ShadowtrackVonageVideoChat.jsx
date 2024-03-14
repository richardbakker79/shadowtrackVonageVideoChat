import { Component, createElement } from "react";

import { VonageVideo } from "./components/VonageVideo";


import "./ui/ShadowtrackVonageVideoChat.css";

export class ShadowtrackVonageVideoChat extends Component {
    render() {

        return (

            <div>

                <VonageVideo
                    apiKey={this.props.apiKey}
                    vonageSessionID={this.props.vonageSessionID}
                    token={this.props.token}
                    loadingDelegate={<div>Loading...</div>}
                    opentokClientUrl="https://static.opentok.com/v2/js/opentok.min.js"
                />

            </div>
        )
    }
}
