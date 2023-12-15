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

const MakeTransaction = observer(() => {
    const classes = useStyles();

    const {user} = useContext(Context);

    const {object} = useContext(Context);

    const [sum, setSum] = useState('');
    const [DestinationBankAccountId, setDestinationBankAccountId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const createTransaction = async (e) => {
        e.preventDefault();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
            try {
            console.log('destination');
            console.log(DestinationBankAccountId);
            const destinationBankAccountData = await Axios.get(`http://localhost:3001/api/bankAccount/findByAccountId/${DestinationBankAccountId}`);
            console.log('Destination bank account');
            console.log(destinationBankAccountData.data);
            const senderBankAccountData = await Axios.get(`http://localhost:3001/api/bankAccount/findByAccountId/${selectedOption}`);
            console.log('User id');
            console.log(`${user.user.id}`);
            console.log('Sender bank account');
            console.log(senderBankAccountData.data);
            await Axios.post('http://localhost:3001/api/transaction', {
                sum: Number(sum),
                date: formattedDate,
                DestinationBankAccountId: Number(destinationBankAccountData.data[0].id),
                SenderBankAccountId: Number(senderBankAccountData.data[0].id)
            })
        } catch(error) {
            console.log(error);
        }
    }

    const preventDefault = event => event.preventDefault();

    return (
    <div className={classes.project}>
        <form className={classes.test} onSubmit={createTransaction}>
            <div>
                Make A transaction
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
                <label className={classes.singUpLabel}>DestinationBankAccountId</label>
                <input 
                    type="text" 
                    value={DestinationBankAccountId}
                    onChange={(e) => setDestinationBankAccountId(e.target.value)}
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
            <button type="submit" className={classes.signUpButton}>
                <div className={classes.signUpButtonText}>
                    Create transaction
                </div>
            </button>
        </form>
    </div>
    )
})

export default MakeTransaction;
