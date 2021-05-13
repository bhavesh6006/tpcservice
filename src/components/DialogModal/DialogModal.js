import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { 
    IconButton,
    Box,
    CircularProgress
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const DialogModal = props => {
    const { classes } = props;
    let disable = false
    if(props.disablePayBtn === true){
        disable = true
    }
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.modalCloseEvent}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            fullWidth={true}
            maxWidth={props.maxWidth ? props.maxWidth : 'xs'}
            className='jupiter-dialog-model'
        >
            <DialogTitle id='alert-dialog-title' className={props.titleClassName ? props.titleClassName : ""}>
                {props.modalTitle}

                {
                    props.showCloseIcon ? (
                        <IconButton
                            aria-label='Close'
                            className='close-icon'
                            onClick={props.closeIconEvent}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null
                }

            </DialogTitle>
            <DialogContent className='alert-dialog-content_wrapper'>
                <div id='alert-dialog-description'>
                    {props.modalContent}
                </div>
            </DialogContent>

            {
                (props.modalCancelButtonText || props.modalOkButtonText) ? (
                    <DialogActions className='alert-dialog-footer_wrapper'>
                        {
                            props.modalCancelButtonText ? (
                                <Button
                                    variant='outlined'
                                    onClick={props.handleCancelEvent}
                                    color='primary'
                                // className={props.classes.button}
                                    disabled={props.modalCancelButtonDisabled ? props.modalCancelButtonDisabled : false}
                                >
                                    {props.modalCancelButtonText}
                                </Button>
                            ) : null
                        }                        

                        {
                            props.modalOkButtonText ? (
                                <Button
                                    variant='contained'
                                    onClick={props.handleOkEvent}
                                    color='primary'
                                    disabled = {props.modalOKButtonDisabled ? props.modalOKButtonDisabled : disable}
                                // className={props.classes.button}
                                >
                                    {props.modalOkButtonText}
                                    {
                                        props.showLoaderOkButton ? (
                                            <Box className='CustLodder' padding={1}>
                                                <CircularProgress size={20} />
                                            </Box>
                                        ) : null
                                    }
                                </Button>
                            )  : null
                        }
                        
                    </DialogActions>
                ) : null
            }
        </Dialog>
    );
};

export default DialogModal;
