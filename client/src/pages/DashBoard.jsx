import React from "react";
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm";
import bankIcon from '../images/money-bags.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    container: {
        backgroundColor: '#0A092E'
    },
    project: {
        width: '100%',
        height: '100vh',
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
                    <p className={classes.leftNavBarText}>Bank App</p>
                    <img src={bankIcon} height={30} alt="Bank App Icon"></img>
                </div>
                <div>
                    <Button className={classes.logInButton} color="inherit" variant="outlined" onClick={handleOpenLogInDialog}>Log in</Button>
                    <Dialog  fullScreen={fullScreen} open ={openLogInDialog} onClose={handleCloseLogInDialog} aria-labelledby='loginForm'>
                        <DialogTitle id="logInFormTitle">
                            Log in
                        </DialogTitle>
                        <LoginForm />
                    </Dialog>
                    <Button color="secondary" variant="contained" onClick={handleOpenSignUpDialog}>Sign up</Button>
                    <Dialog className={classes.dialog} open ={openSignUpDialog} onClose={handleCloseSignUpDialog} aria-labelledby='registrationForm'>
                        {/* <DialogTitle id="LogInFormTitle">
                            Sign up
                        </DialogTitle> */}
                        <RegistrationForm />
                    </Dialog>
                </div>
            </Toolbar>
        </Container>
        {/* <p>Make a deposit</p>
        <p>Make a credit</p>
        <p>our deposits, credits etc</p>
        <p>My profile</p>
        <p>Create aim</p>
        <p>Money transfers</p> */}
    </div>
    
    )
}

export default DashBoard;
