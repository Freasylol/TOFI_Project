import React, { useContext } from 'react';
import {makeStyles} from '@material-ui/core';
import { Context } from '../index';
import {observer} from 'mobx-react-lite';
import ObjectItem from './ObjectItem';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'black'
    },
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

const Credit = observer(() => {
    // let host = 'http://localhost:3001';
    let host = 'https://tofi-project.onrender.com'

    let element = document.querySelector('0');

    const classes = useStyles();

    const {object} = useContext(Context);

    let creditsMod = object.credits.map(obj => {
        console.log(object.credits);
        let {sum, term, percent, debt, payed, type, creditId} = obj;
        return {sum, term, percent, debt, payed, type, creditId};
    })

    const payCredit = async(e) => {
        e.preventDefault();
        console.log(e.target);
        // <document className="getQuerySelector"></document>
        let type = object.credits[0].type;
        console.log(type);

        if (element) {
            console.log('bebra');
        }
        
        if (type === "Differential") {
            console.log('differential');
            let sum = object.credits[0].sum;
            let body = object.credits[0].body;
            let term = object.credits[0].term;
            let payed = object.credits[0].payed;
            let percent = 12;
            let monthDebt = sum / term;
            let monthPercent = (body * (percent / 100) * 30) / 365;
            let monthPay = (monthDebt + monthPercent);
            object.credits[0].payed += monthPay;
            payed += monthPay;
            body -= monthPay
            Axios.put(`${host}/api/credit/sum/1`, {
                    payed: Number(payed),
                    body: Number(body)
                })
            
        } else {
            let payed = object.credits[0].payed;
            let debt = object.credits[0].debt;
            let term = object.credits[0].term;
            let body = object.credits[0].body; 
            if (payed < debt) {
                let mouthPay =  debt / term;
                if (debt - payed < mouthPay) {
                    mouthPay = debt - payed;
                }
                Axios.put(`${host}/api/credit/sum/1`, {
                    payed: payed + Number(mouthPay),
                    body: body - mouthPay
                })

                object.credits[0].body -= mouthPay
                console.log(mouthPay);
                object.credits[0].payed += mouthPay;
            }
           
            
        }       
    }

    return (
        <div className={classes.test}>    
            <div>
               {creditsMod.map((credit, index) => {
                    return <div>
                        <div>Id: {object.credits[index].id}</div>
                        <ObjectItem key={credit.id} message={'Credit'} object={credit}></ObjectItem>
                        <button class={String(index)} onClick={payCredit}>Pay</button>
                    </div>
                     
               })}

            </div>
        </div>
    )
})

export default Credit
