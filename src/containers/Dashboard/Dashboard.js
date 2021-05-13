import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {
    Button,
    Grid,
    Box,
    CircularProgress,
    TextField,
    Container,
    Typography,
    Link
} from '@material-ui/core';

const style = {};

class Dashboard extends Component {
    render() {
        return (
            <Grid container className="">
                Comming soon....!
            </Grid>
        )
    }
}

export default withRouter(withStyles(style)(Dashboard));