import React from 'react';
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import DashBoard from './DashBoard';
import { ClassNames } from '@emotion/react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
// import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
    test: {
        paddingTop: '50px',
        backgroundColor: '#0A092E',
        height: '90vh'
    }, 
    signUpButton: {
        outline: 'none',
        border: 'none',
        backgroundColor: '#4255FF',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        cursor: 'pointer',

        borderRadius: '60px',
        width: '180px'
    },
    signUpButtonText: {
        color: '#0A092E',
        fontSize: '24px'
    },
    navLinkStyle: {
        color: '#F6F7FB',
        textDecoration: 'none',
        display: 'block',
        cursor: 'pointer'
    }
}))

function Main() {
    const classes = useStyles();

    return (
        <div className={classes.test}>    
            <button className={classes.signUpButton}>
                <div className={classes.signUpButtonText}>
                    Make a deposit
                </div>
            </button>

            <NavLink className={classes.navLinkStyle} to="/deposit">Make a deposit</NavLink>
            <NavLink className={classes.navLinkStyle} to="/credit">Make a credit</NavLink>
            <NavLink className={classes.navLinkStyle} to="/profile">My profile</NavLink>
            <NavLink className={classes.navLinkStyle} to="/aim">Create new aim</NavLink>
        </div>
    )
}

export default Main
