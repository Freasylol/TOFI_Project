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
    const classes = useStyles();

    const {user} = useContext(Context);

    const {object} = useContext(Context);

    const [sum, setSum] = useState('');
    const [date, setDate] = useState('');
    const [term, setTerm] = useState('');
    
    const [DestinationBankAccountId, setDestinationBankAccountId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }



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

    const createDiffCredit = async (e) => {
        let sum = 20000;
        let percent = 9;
        let term = 12;
        let mouthDebt = sum / term;
        let mouthPercent = (sum * (percent / 100) * 31) / 365
        let mouthPay = (mouthDebt + mouthPercent).toFixed(2);
        console.log(sum);
        console.log(mouthDebt);
        console.log(mouthPercent);
        console.log(mouthPay);
    }

    // const createTransaction = async (e) => {
    //     e.preventDefault();
    //     let today = new Date();
    //         try {
    //         const bankAccountData = await Axios.get(`http://localhost:3001/api/bankAccount/findByUserId/${user.user.id}`);
    //         await Axios.post('http://localhost:3001/api/transaction', {
    //             sum: Number(sum),
    //             date: today,
    //             DestinationBankAccountId: DestinationBankAccountId,
    //             SenderBankAccountId: bankAccountData.data[0].accountId
    //         })
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    const preventDefault = event => event.preventDefault();

    return (
    <div className={classes.project}>
        <form className={classes.test}>
            <div>
                Create a credit
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
                <label className={classes.singUpLabel}>Date</label>
                <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
