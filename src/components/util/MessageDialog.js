import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function MessageDialog(props) {

    const  title = props.messageType === 'success' ? "Successful!" : "Failed";
    const  icon = props.messageType === 'success' ?
        <CheckCircleIcon style={{"color": "green"}}/> : <ErrorIcon color={"error"}/>

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {icon}
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
