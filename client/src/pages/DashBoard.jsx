import React, { useContext } from "react";
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import RegistrationForm from "./RegistrationForm.jsx";
import LoginForm from "./LoginForm";
import bankIcon from '../images/money-bags.png';
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";

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

const DashBoard = observer(() => {
    const classes = useStyles();

    const {user} = useContext(Context);

    const logout = async () => {
        user.setIsAuth(false);
    }

    let authBlock = null;

    if (user.isAuth === false) {
         
        authBlock = <div style={{display: "flex"}}>
            <LoginForm />
            <RegistrationForm />
        </div>
    } else {
        authBlock =
        <Button color="inherit" variant="outlined" onClick={logout}>
            Logout
        </Button>
    }

    return (
    <div className={classes.project}>
        <Container className={classes.container}>
            <div className={classes.overlay} />
            <Toolbar className={classes.navBarContainer}>
                    <div className={classes.leftNavBar}>
                        <Link href="/" className={[classes.leftNavBarText, classes.link]}>Bank App</Link>
                        <img src={bankIcon} height={30} alt="Bank App Icon"></img>
                        <div>{user.user.first_name}</div>
                    </div>             
                    {authBlock}
            </Toolbar>
        </Container>
    </div>
    )
})

export default DashBoard;
