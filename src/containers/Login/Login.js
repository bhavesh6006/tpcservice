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
    Typography
} from '@material-ui/core';
import Logo from '../../assets/logo.png';
import _ from 'lodash';
import Snackbar from '../../components/Snackbar/Snackbar';

const style = {};

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {
                userName: {
                    isError: false,
                    errorMessage: "Field is mandatory"
                },
                password: {
                    isError: false,
                    errorMessage: "Field is mandatory"
                }
            },
            fields: {
                userName: "",
                password: ""
            },
            showLoader: false,
            showLoginErrorMessage: false,
            loginErrorMessage: "",
            isFormSubmitted: false
        }
    }

    componentDidMount() {
        console.log('login page...')
    }

    handleChange = async (e, fieldName) => {
        let { fields } = _.cloneDeep(this.state);

        let fieldValue = e.target.value;
        fields[fieldName] = fieldValue;
        await this.setState({ fields });
        this.validateForm();
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({ isFormSubmitted: true });
        this.validateForm(true);
    }

    validateForm = (isSubmit = false) => {
        let { userName, password } = _.cloneDeep(this.state.fields);
        let { errors, isFormSubmitted } = _.cloneDeep(this.state);

        userName = userName.trim();
        password = password.trim();

        if (userName.length === 0) {
            errors['userName'].isError = true;
            errors['userName'].errorMessage = "Field is mandatory"
        } else {
            errors['userName'].isError = false;
        }

        if (password.length === 0) {
            errors['password'].isError = true;
            errors['password'].errorMessage = "Field is mandatory"
        } else {
            errors['password'].isError = false;
        }

        if (isSubmit || isFormSubmitted) {
            this.setState({ errors });
        }

        if (isSubmit && !errors['userName'].isError && !errors['password'].isError) {
            this.setState({ showLoader: true }, this.checkLogin());
        }       
    }

    checkLogin = () => {
        
    }

    closeErrorNotificationAfterSetTimeOut = () => {
        const duration = 4000;
        setTimeout(async () => {
            await this.setState({
                showLoginErrorMessage: false
            });
        }, duration);
    };

    onCloseSnackBar = () => {
        this.setState({
            showLoginErrorMessage: false
        });
    }

    render() {
        const {
            fields,
            errors,
            showLoader,
            showLoginErrorMessage,
            loginErrorMessage
        } = _.cloneDeep(this.state);

        return (
            <Container className="login-page">
                {
                    (showLoginErrorMessage) ? this.closeErrorNotificationAfterSetTimeOut() : null
                }

                {
                    showLoginErrorMessage ? (
                        <Snackbar
                            message={loginErrorMessage}
                            open={true}
                            duration={4000}
                            closeSnackBar={this.onCloseSnackBar}
                            variant={'error'}
                        />
                    ) : null
                }                

                <Grid container spacing={3} className="login-page-wrapper">
                    <Grid item xs={12} md={6} lg={6} className="login-img">
                        <img src={Logo} alt='' style={{ maxWidth: "520px" }} />
                    </Grid>
                    <Grid item xs={12} md={5} lg={5} className="login-form">
                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography color='primary' variant='h6' className="category-name">Login To Your Account</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="User Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        name='userName'
                                        onChange={e => this.handleChange(e, "userName")}
                                        value={fields["userName"]}
                                        helperText={errors['userName'].isError ? errors['userName'].errorMessage : ""}
                                        error={errors['userName'].isError}
                                        id="userName"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type='password'
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                        name='password'
                                        onChange={e => this.handleChange(e, "password")}
                                        value={fields["password"]}
                                        helperText={errors['password'].isError ? errors['password'].errorMessage : ""}
                                        error={errors['password'].isError}
                                        id="password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" disabled={showLoader}>
                                        Login
                                        {
                                            showLoader ? (
                                                <Box className='CustLodder' padding={1}>
                                                    <CircularProgress size={20} />
                                                </Box>
                                            ) : null
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default (withRouter(withStyles(style)(Login)));