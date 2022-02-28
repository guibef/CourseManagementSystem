import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {LinearProgress, TextField} from "@material-ui/core";
import {JwtService} from "../services/JwtService";
import cookies from "react-cookies";
import {TOKEN_COOKIE_NAME} from "../constant";

export default function LoginDialog(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    let username;
    let password;

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Please login</DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic"
                               label="Username"
                               autoFocus
                               fullWidth
                               onChange={event => username = event.target.value}/>
                    <TextField id="standard-basic"
                               label="Password"
                               fullWidth
                               type="password"
                               onChange={event => password = event.target.value}/>
                    <DialogContentText id="alert-dialog-description" style ={{"color": "red"}}>
                        {errorMessage}
                    </DialogContentText>
                    {isLoading && <LinearProgress />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={login} color="primary" disabled={isLoading} >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function login() {
        //console.log("The username is:", username);
        //console.log("The password is:", password);

        setErrorMessage('');
        setLoading(true);
        // call authenticate api to get JWT token
        JwtService.login(username, password)
            .then(response => {
                const jwtToken = response.data.id_token;
                cookies.save(TOKEN_COOKIE_NAME, jwtToken);
                window.location.reload(); //Browser object model, like refresh button in browser
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
            .finally(()=> {
                setLoading(false);
            })
    }
}
