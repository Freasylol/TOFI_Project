import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles, Dialog, useTheme, useMediaQuery, DialogActions, Button } from '@material-ui/core';
import { jwtDecode } from 'jwt-decode';
import { Context } from '../index';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

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
}))

const LoginForm = observer(() => {
    const classes = useStyles();
    const theme = useTheme();

    const[openAuthDialog, setAuthDialog] = useState(false);

    const handleOpenAuthDialog = () => setAuthDialog(true);

    const handleCloseAuthDialog = () => setAuthDialog(false);

    const handleOpenLogInDialog = () => setOpenLogInDialog(true);

    const handleCloseLogInDialog = () => {
        console.log('close');
        setOpenLogInDialog(false);
    } 

    const handleCloseLogInDialogOpenAuth = () => {
        setOpenLogInDialog(false);
        handleOpenAuthDialog();
    }

    // const requestPath = 'http://localhost:3001';
    const requestPath = 'https://tofi-project.onrender.com';

    const remoteRequestPath = 'https://tofi-project.onrender.com';
    // const remoteRequestPath = 'https://tofi-project.onrender.com';
    
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const[openLogInDialog, setOpenLogInDialog] = useState(false);

    const {user} = useContext(Context);
    const {object} = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState('');

    const [token, setToken] = useState('');

    const submitLogin = async (e) => {
        console.log(process.env.REACT_APP_API_URL);
        e.preventDefault();
            try {
            const {data} = await Axios.post(`${requestPath}/api/user/login`, {
                email: email,
                password: password,
            })
            setToken(data);
        } catch(error) {
            console.log(error);
        }
    }

    const submitAuth = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(`${requestPath}/api/user/verify`, {
                message: auth,
            }).then(async (data) => {
                console.log(data);
                localStorage.setItem('token', token)
                let jwtData = jwtDecode(token);
                user.setIsAuth(true);
                const userData = await Axios.get(`${requestPath}/api/user/${jwtData.id}`);
                user.setUser(userData.data);
                const bankAccountData = await Axios.get(`${requestPath}/api/bankAccount/findByUserId/${jwtData.id}`);
                object.setBankAccounts(bankAccountData.data);
                console.log(bankAccountData.data);
                const creditData = await Axios.get(`${requestPath}/api/credit/findByUserId/${user.user.id}`);
                object.setCredits(creditData.data);
                console.log(creditData.data);
                const transactionData = await Axios.post(`${requestPath}/api/transaction/findByUserId/${user.user.id}`);
                object.setTransactions(transactionData.data);
                console.log(transactionData);
                const depositData = await Axios.get(`${requestPath}/api/deposit/findByUserId/${user.user.id}`);
                object.setDeposits(depositData.data);
                console.log(depositData);
                // console.log(object.credits);  
            })
        } catch(error) {
            console.log(error);
        } 
    }

  return (
<div>
    <Button className={classes.logInButton} color="inherit" variant="outlined" onClick={handleOpenLogInDialog}>Log in</Button>
        <Dialog fullScreen={fullScreen} open={openLogInDialog} onClose={handleCloseLogInDialog} aria-labelledby='loginForm'>
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
            <button type="submit" onClick={handleCloseLogInDialogOpenAuth} className={classes.signUpButton}>
                <div className={classes.signUpButtonText}>
                    Sign In
                </div>
            </button>
        </form>
        </div> 
        </Dialog>
        <Dialog fullScreen={fullScreen} open={openAuthDialog} onClose={handleCloseAuthDialog} aria-labelledby='authForm'>
            <div className={classes.signUp}>
                <form className={classes.signUpForm} onSubmit={submitAuth}>
                <div>
                    Double auth 
                </div>
                <div>
                    <label className={classes.singUpLabel}>Auth code</label>
                    <input  
                        type="text" 
                        value={auth} 
                        onChange={(e) => setAuth(e.target.value)}
                        className={classes.signUpInput}  
                        // pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" 
                        required>
                    </input>
                </div>
                <button type="submit" onClick={handleCloseAuthDialog} className={classes.signUpButton}>
                    <div className={classes.signUpButtonText}>
                        Auth
                    </div>
                </button>
            </form>
            </div>
        </Dialog>
    </div>

    
  )
})

export default LoginForm;