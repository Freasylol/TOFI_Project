import React from "react";
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm";
import bankIcon from '../images/money-bags.png';
// import {Link} from 'react-router-dom';
// import { Router } from "express";
// import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min.js";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#0A092E'
    },
    title: {
        flexGrow: 1
    },
    project: {
        width: '100%',
        height: '10vh',
        backgroundColor: '#0A092E',
        color: '#F6F7FB'
    },
    dialog: {
        backgroundColor: '#0A092E'
    },
    leftNavBar: {
        display: 'flex',
        alignItems: 'center',
    },
    leftNavBarText: {
        marginRight: '10px'
    },
    navBarContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logInButton: {
        marginRight: '10px'
    },
    link: {
        textDecoration: 'none', 
        color: "#F6F7FB",
        cursor: 'pointer'
    }
}))

const DashBoard = () => {
    const classes = useStyles();

    const preventDefault = event => event.preventDefault();

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const[openLogInDialog, setOpenLogInDialog] = React.useState(false);

    const[openSignUpDialog, setOpenSignUpDialog] = React.useState(false);

    const[openMenu, setOpenMenu] = React.useState(false);

    const handleOpenMenu = () => setOpenMenu(true);

    const handleCloseMenu = () => setOpenMenu(false);

    const handleOpenLogInDialog = () => setOpenLogInDialog(true);

    const handleCloseLogInDialog = () => setOpenLogInDialog(false);

    const handleOpenSignUpDialog = () => setOpenSignUpDialog(true);
    
    const handleCloseSignUpDialog = () => setOpenSignUpDialog(false);

    return (
    <div className={classes.project}>
        
        <Container className={classes.container}>
            <div className={classes.overlay} />
            <Toolbar className={classes.navBarContainer}>
                
                    <div className={classes.leftNavBar}>
                
                        <Link href="/" className={[classes.leftNavBarText, classes.link]}>Bank App</Link>
                        <img src={bankIcon} height={30} alt="Bank App Icon"></img>
                    </div>  
                             
                <div>
                    <Button className={classes.logInButton} color="inherit" variant="outlined" onClick={handleOpenLogInDialog}>Log in
                    <Dialog  fullScreen={fullScreen} open ={openLogInDialog} onClose={handleCloseLogInDialog} aria-labelledby='loginForm'>
                        <LoginForm close={handleCloseLogInDialog} />
                    </Dialog>
                    </Button>
                  
                    <Button color="secondary" variant="contained" onClick={handleOpenSignUpDialog}>Sign up</Button>
                    <Dialog className={classes.dialog} open ={openSignUpDialog} onClose={handleCloseSignUpDialog} aria-labelledby='registrationForm'>
                        <RegistrationForm />
                    </Dialog>
                </div>
            </Toolbar>
        </Container>
        
    </div>
    
    )
}

export default DashBoard;
