import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Footer extends Component {
    render() {
        return (
            <footer>
                <span>©2021 Assiduous</span>
            </footer>
        )
    }
}

export default withRouter(Footer);