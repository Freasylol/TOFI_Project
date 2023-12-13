import React, { useContext } from 'react';
import {makeStyles} from '@material-ui/core';
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
