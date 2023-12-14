import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { makeStyles, Dialog, useTheme, useMediaQuery, DialogActions, Button } from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { Context } from '../index';

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

const RegistrationForm = observer(() => {
    const classes = useStyles();

    const {user} = useContext(Context);

    const handleOpenSignUpDialog = () => setOpenSignUpDialog(true);
    
    const handleCloseSignUpDialog = () => setOpenSignUpDialog(false);

    const[openSignUpDialog, setOpenSignUpDialog] = useState(false);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [passport_id, setPassportId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const submitRegistration = async (e) => {
        e.preventDefault();
        try {
            await Axios.post('http://localhost:3001/api/user', {
                first_name: first_name,
                last_name: last_name, 
                email: email,
                password: password,
                passport_id: passport_id,
                birth_date: birth_date,
                roleId: 1,
            }).then((data) => {
                const userData = jwtDecode(data.data);
                user.setUser(userData);
                user.setIsAuth(true);
                console.log(user);
            })
        } catch(error) {
            console.log(error);
        } 
    }

  return (
<div>
    <Button color="secondary" variant="contained" onClick={handleOpenSignUpDialog}>Sign up</Button>
    <Dialog className={classes.dialog} open ={openSignUpDialog} onClose={handleCloseSignUpDialog} aria-labelledby='registrationForm'>
        <div className={classes.signUp}>
            <form className={classes.signUpForm} onSubmit={submitRegistration}>
                <div class="sign-up__form-header">
                    Let’s create your user account
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Name</label>
                    <input 
                        type="text" 
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)} 
                        className={classes.signUpInput}
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Last Name</label>
                    <input
                        type="text"
                        value={last_name} 
                        onChange={(e) => setLastName(e.target.value)}
                        className={classes.signUpInput}
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Date Of Birth</label>
                    <input 
                        type="text"
                        value={birth_date} 
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={classes.signUpInput}
                        pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" 
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Passport ID</label>
                    <input 
                        type="text"
                        value={passport_id} 
                        onChange={(e) => setPassportId(e.target.value)}
                        className={classes.signUpInput} 
                        pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" 
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Email</label>
                    <input  
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.signUpInput}  
                        pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" 
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Password</label>
                    <input 
                        type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.signUpInput}
                        required>
                    </input>
                </div>
                <div class="sign-up__form-item">
                    <label className={classes.singUpLabel}>Confirm Password</label>
                    <input 
                        type="text" 
                        value={confirm_password} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={classes.signUpInput}
                        required>
                    </input>
                </div>
                <div class="sign-up__form-hints">          
                </div>
                <button type="submit" onClick={handleCloseSignUpDialog} className={classes.signUpButton}>
                    <div className={classes.signUpButtonText}>
                        Sign up
                    </div>
                </button>
            </form>
        </div> 
    </Dialog>
</div>
  )
})

export default RegistrationForm;


