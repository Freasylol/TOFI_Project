import React, { useContext, useState } from "react";
import { AppBar, Container, IconButton, Toolbar, Button, Typography, Box, makeStyles, Dialog, DialogTitle, useTheme, useMediaQuery, Menu, MenuItem, Link} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";
import Axios from "axios";

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

const MakeDeposit = observer(() => {

    // const percent = 12;
    let percent = 4;
    const classes = useStyles();

    const types = ['Fixed', 'Floating'];

    const {user} = useContext(Context);

    const {object} = useContext(Context);

    // let host = 'http://localhost:3001';
    let host = 'https://tofi-project.onrender.com';

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

    const createDeposit = async (e) => {
        e.preventDefault();

        if (selectedType == 'Floating') {
            if (term <= 6) {
                percent = 3;
            } else if (term <= 12) {
                percent = 3.5;
            } else if (term <= 24) {
                percent = 4.5;
            }
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        try {
            const senderBankAccountData = await Axios.get(`${host}/api/bankAccount/findByAccountId/${selectedOption}`);

            const deposit = await Axios.post(`${host}/api/deposit`, {
                sum: Number(sum),
                date: formattedDate,
                term: term,
                percent: percent,
                received_sum: 0,
                depositType: selectedType,
                bankAccountId: senderBankAccountData.data[0].id,
                userId: Number(user.user.id)
            })

            object.deposits.push({
                sum: Number(sum),
                date: formattedDate,
                term: term,
                percent: percent,
                received_sum: 0,
                depositType: 'Fixed',
                bankAccountId: senderBankAccountData.data[0].id,
                userId: Number(user.user.id)
            })

            const bankAccount = await Axios.get(`${host}/api/bankAccount/${senderBankAccountData.data[0].id}`);
            console.log(bankAccount.data);
            let balance = bankAccount.data.balance;

            balance -= deposit.data.sum;
            await Axios.put(`${host}/api/bankAccount/${senderBankAccountData.data[0].id}`, {
                balance: balance,
            });
        } catch(e) {
            console.log(e);
        } 
    }

    const preventDefault = event => event.preventDefault();

    return (
    <div className={classes.project}>
        <form className={classes.test}>
            <div>
                Create a deposit
            </div>
            <div>
                <select value={selectedType} onChange={handleSelectedType}>
                    <option value="">Select Deposit Type</option>
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
            <button type="submit" className={classes.signUpButton} onClick={createDeposit}>
                <div className={classes.signUpButtonText}>
                    Create deposit
                </div>
            </button>
        </form>
    </div>
    )
})

export default MakeDeposit;
