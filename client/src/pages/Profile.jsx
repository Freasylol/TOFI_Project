import React, { useContext } from 'react';
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import DashBoard from './DashBoard';
import { ClassNames } from '@emotion/react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from '..';
import ObjectItem from './ObjectItem';
// import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
    test: {
        paddingTop: '50px',
        backgroundColor: '#0A092E',
        height: '90vh',
        color: '#F6F7FB'
    }, 
    signUpButton: {
        outline: 'none',
        border: 'none',
        backgroundColor: '#4255FF',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        cursor: 'pointer',

        // paddingTop: '50px',

        borderRadius: '60px',
        width: '180px'
    },
    signUpButtonText: {
        color: '#0A092E',
        fontSize: '24px'
    },
}))

function Profile() {
    const classes = useStyles();

    const {user} = useContext(Context); 

    return (
        <div className={classes.test}>    
            <div>
                {user.user.map(el => {
                    return <ObjectItem key={el.id} message={'Profile'} object={el}></ObjectItem>
                })}
            </div>
        </div>

    )
}

export default Profile
