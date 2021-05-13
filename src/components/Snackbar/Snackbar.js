import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: '#fff',
        fontSize: 14,
        marginBottom: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '3rem'
        }
    },
    success: {
        backgroundColor: '#43A047',
        color: '#fff',
        fontSize: 14,
        marginBottom: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '3rem'
        }
    },
    close: {
        padding: theme.spacing(0.5)
    }
});

class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
        if (this.props.closeSnackBar) {
            this.props.closeSnackBar();
        }
    };

    render() {
        const { classes, variant, duration } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={this.state.open}
                    autoHideDuration={duration || 2000} // close snackbar afer 1.5 seconds
                    onClose={this.handleClose}
                    ContentProps={{
                        classes: {
                            root: classNames(classes[variant])
                        },
                        'aria-describedby': 'message-id'
                    }}
                    message={<span id='message-id'>{this.props.message}</span>}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

SnackBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnackBar);

