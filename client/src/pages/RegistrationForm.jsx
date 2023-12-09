import React, { useState } from 'react';
import {Field, Formik} from "formik";
import  * as Yup from "yup";
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';

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

const RegistrationForm = () => {
    const classes = useStyles();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [passport_id, setPassportId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const submitRegistration = (e) => {
        e.preventDefault();
        try {
            Axios.post('http://localhost:3001/user', {
                first_name: first_name,
                last_name: last_name, 
                email: email,
                password: password,
                passport_id: passport_id,
                birth_date: birth_date,
                roleId: 1,
            })
        } catch(error) {
            console.log(error);
        }
       
    }

//   const validationSchema = Yup.object().shape({
//       name: Yup.string().typeError('Should be a string').required('Necessarily'),
//       lastName: Yup.string().typeError('Should be a string').required('Necessarily'),
//       password: Yup.string().typeError('Should be a string').required('Necessarily'),
//       confirmPassword: Yup.string().oneOf([Yup.ref('password')],'passwords do not match').required('Necessarily'),
//       email: Yup.string().email('enter correct email').required('Necessarily'),
//   })

  return (
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
            <button type="submit" className={classes.signUpButton}>
                <div className={classes.signUpButtonText}>
                    Sign up
                </div>
            </button>
        </form>
    </div> 
  )
}

export default RegistrationForm;


