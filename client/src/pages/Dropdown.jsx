import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Context } from '../index';
import {observer} from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
    test: {
        paddingTop: '50px',
        backgroundColor: '#0A092E',
        height: '90vh',
        color: '#F6F7FB'
    }
}))

const Dropdown = observer(() => {
    const classes = useStyles();

    const {object} = useContext(Context);

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <div>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select Variant</option>
                {object.bankAccounts.map((bankAccount, index) => (
                    <option key={index} value={bankAccount.accountId}>{bankAccount.accountId}</option>
                ))}
            </select>
        </div>
    )
})

export default Dropdown