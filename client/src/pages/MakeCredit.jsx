import React, { useContext, useState } from "react";
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";
import Axios from "axios";
import Dropdown from './Dropdown.jsx';

const useStyles = makeStyles((theme) => ({
    test: {
        paddingTop: '50px',
        backgroundColor: '#0A092E',
        height: '90vh',
        color: '#F6F7FB'
    },
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

const MakeCredit = observer(() => {

    const percent = 12;
    const classes = useStyles();

    const types = ['Annuity', 'Differential'];

    const {user} = useContext(Context);

    const {object} = useContext(Context);

    const createAnuitentCredit = async (e) => {
        let sum = 1000;
        let percent = 9;
        let term = 12;
        let mouthPercent = percent / (100 * term);
        let mouthPay = (sum * (mouthPercent / (1 - (1 + mouthPercent)**(-12)))).toFixed(2);
        console.log(sum);
        console.log(mouthPercent);
        console.log(mouthPay);
    }

    const [sum, setSum] = useState('');
    const [term, setTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const handleSelectedType = (event) => {
        setSelectedType(event.target.value);
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const createDiffCredit = async (e) => {
        e.preventDefault();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        // let mouthPercent = percent / (100 * term);
        // let mouthPay = (sum * (mouthPercent / (1 - (1 + mouthPercent)**(-12)))).toFixed(2);
        // let totalSum = mouthPay * term;
        // console.log(totalSum);
        // console.log(sum);
        // console.log(mouthPercent);
        // console.log(mouthPay);
        let totalSum = 0;

        if (selectedType === 'Differential') {
            let creditTerm = term;
            totalSum = 0;
            let creditSum = sum;
            let monthDebt = sum / term;
            let monthPercent = 0;
            let monthPay = 0;
            while (creditTerm > 0) {
                monthPercent = (creditSum * (percent / 100) * 30) / 365
                monthPay = (monthDebt + monthPercent);
                console.log(monthPay);
                totalSum += monthPay;
                creditSum -= monthDebt;
                creditTerm--;
            }
        } else {
            let mouthPercent = percent / (100 * term);
            let mouthPay = (sum * (mouthPercent / (1 - (1 + mouthPercent)**(-12)))).toFixed(2);
            totalSum = mouthPay * term;
        } 

        // console.log(sum);
        // console.log(monthDebt);
        // console.log(monthPercent);
        // console.log(monthPay);
        // console.log(totalSum);

        try {
            const senderBankAccountData = await Axios.get(`http://localhost:3001/api/bankAccount/findByAccountId/${selectedOption}`);

            await Axios.post('http://localhost:3001/api/credit', {
                sum: Number(sum),
                date: formattedDate,
                term: term,
                percent: percent,
                debt: Number(totalSum.toFixed(2)),
                payed: 0,
                type: selectedType,
                bankAccountId: senderBankAccountData.data[0].id,
                userId: Number(user.user.id)
            })

            const bankAccount = await Axios.get(`http://localhost:3001/api/bankAccount/${senderBankAccountData.data[0].id}`);
            console.log(bankAccount.data);
            let balance = bankAccount.data.balance;

            balance += totalSum;
            await Axios.put(`http://localhost:3001/api/bankAccount/${senderBankAccountData.data[0].id}`, {
                balance: balance,
            });
        } catch(e) {
            console.log(e);
        } 
        // let mouthDebt = sum / term;
        // let mouthPercent = (sum * (percent / 100) * 31) / 365
        // let mouthPay = (mouthDebt + mouthPercent).toFixed(2);
        // console.log(sum);
        // console.log(mouthDebt);
        // console.log(mouthPercent);
        // console.log(mouthPay);
    }

    const preventDefault = event => event.preventDefault();

    return (
    <div className={classes.project}>
        <form className={classes.test}>
            <div>
                Create a credit
            </div>
            <div>
                <select value={selectedType} onChange={handleSelectedType}>
                    <option value="">Select Credit Type</option>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={classes.singUpLabel}>Sum</label>
                <input  
                    type="text" 
                    value={sum} 
                    onChange={(e) => setSum(e.target.value)}
                    className={classes.signUpInput}  
                    required>
                </input>
            </div>
            <div>
                <label className={classes.singUpLabel}>Term</label>
                <input 
                    type="text" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className={classes.signUpInput}
                    required>
                </input>
            </div>
            <div>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Select Variant</option>
                    {object.bankAccounts.map((bankAccount, index) => (
                        <option key={index} value={bankAccount.accountId}>{bankAccount.accountId}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className={classes.signUpButton} onClick={createDiffCredit}>
                <div className={classes.signUpButtonText}>
                    Create credit
                </div>
            </button>
        </form>
    </div>
    )
})

export default MakeCredit;
