import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import LoginDialog from "./LoginDialog";
import cookies from "react-cookies";
import {TOKEN_COOKIE_NAME} from "../constant";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const token = cookies.load(TOKEN_COOKIE_NAME);
  const logInOrOut = token ? "Logout" : "Login";

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleLoginClicked = () => {
    if (token) { //Perform logout
      cookies.remove(TOKEN_COOKIE_NAME);
      window.location.reload();
    } else { //open login dialog
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Course Enrollment System
          </Typography>

            <Button color="inherit" component={Link} to="/">All courses</Button>
            <span>|</span>
            <Button color="inherit" component={Link} to="/enrolled-courses">
                Enrolled courses
            </Button>
            <Button color="inherit" onClick={handleLoginClicked}>{logInOrOut}</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={open} handleClose={handleClose}/>
    </div>
  );
}
