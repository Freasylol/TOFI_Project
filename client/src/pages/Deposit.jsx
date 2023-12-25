import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { Context } from '../index';
import {observer} from 'mobx-react-lite';
import ObjectItem from './ObjectItem';
import Axios from 'axios';

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

        borderRadius: '60px',
        width: '180px'
    },
    signUpButtonText: {
        color: '#0A092E',
        fontSize: '24px'
    },
}))

const Deposit = observer(() => {
    // let host = 'http://localhost:3001';
    let host = 'https://tofi-project.onrender.com';

    const classes = useStyles();

    const {object} = useContext(Context);

    const getMonthDeposit = async(e) => {
        e.preventDefault();
        let num = Number(e.target.className);
        object.deposits[num].sum += 2;
        let percent = object.deposits[num].percent;
        let received_sum = object.deposits[num].received_sum;
        let plusSum = object.deposits[num] + object.deposits[num] * (percent / 100) ;

        Axios.put(`${host}/api/deposit/receive/1`, {
            received_sum: Number(received_sum + plusSum),
        })
    }

    return (
        <div className={classes.test}>    
            <div>
               {object.deposits.map((deposit, index) => {
                    return <div>
                        <ObjectItem key={deposit.id} message={'Deposit'} object={deposit}></ObjectItem>
                        <button className={index} onClick={getMonthDeposit}>GetMonth Pay</button>
                    </div>
                     
               })}
            </div>
        </div>
    )
})

export default Deposit
