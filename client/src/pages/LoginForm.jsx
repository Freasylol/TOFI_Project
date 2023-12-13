import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { jwtDecode } from 'jwt-decode';
import { Context } from '../index';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import UserStore from '../store/userStore';

const useStyles = makeStyles((theme) => ({
    signUp: {
        color: '#F6F7FB',
        backgroundColor: '#0A092E',
        padding: '20px',
        boxSizing: 'border-box',
        margin: 0,
        fontSize: '24px'
    },
    signUpForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    signUpInput: {
        border: '1px solid #7E7E7E',
        borderRadius: '60px',
        outline: 'none',
        outlineOffset: '0',
        lineHeight: '1.5em',
        padding: '4px 6px',
        display: 'block',
        width: '300px',
        boxSizing: 'border-box',
        backgroundColor: '#2E3856',
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

        marginTop: '50px',

        borderRadius: '60px',
        width: '180px'
    },
    signUpButtonText: {
        color: '#0A092E',
        fontSize: '24px'
    },
    singUpLabel: {
        fontSize: '20px'
    },
    form: {
        display: 'block',
        fontFamily: 'Arial Helvetica, sans-serif',
        position: 'relative',
        padding: '0 24px 24px 24px',
        margin: 'auto',
    },
    error: {
        color: 'red',
        fontWeight: 700,
        fontSize: '13px',
    } 
}))

const LoginForm = observer(({close}) => {
    const classes = useStyles();

    const {user} = useContext(Context);

    const [open, setOpen] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await Axios.post('http://localhost:3001/user/login', {
                email: email,
                password: password,
            })
            console.log(data);
            localStorage.setItem('token', data)
            let jwtData = jwtDecode(data);
            user.setIsAuth(true);
            user.setUser(jwtData);
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className={classes.signUp}>
        <form className={classes.signUpForm} onSubmit={submitLogin}>
            <div>
                Sign in your account
            </div>
            <div>
                <label className={classes.singUpLabel}>Email</label>
                <input  
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.signUpInput}  
                    // pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" 
                    required>
                </input>
            </div>
            <div>
                <label className={classes.singUpLabel}>Password</label>
                <input 
                    type="text" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.signUpInput}
                    required>
                </input>
            </div>
            <button type="submit" onClick={close} className={classes.signUpButton}>
                <div className={classes.signUpButtonText}>
                    Sign In
                </div>
            </button>
        </form>
    </div> 
  )
})

export default LoginForm;


