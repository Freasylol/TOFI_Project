import React, { useContext, useState } from 'react';
import { makeStyles} from '@material-ui/core';
import { Context } from '../index';
import {observer} from 'mobx-react-lite';
import ObjectItem from './ObjectItem';


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

const Aim = observer(() => {
    const [sum, setSum] = useState('');
    const [desiredSum, setDesiredSum] = useState('');

    const classes = useStyles();

    const {object} = useContext(Context);

    const getRecomendation = async(e) => {
        e.preventDefault();
        let fixedPercent = 4;
        let floatingPercent = 3.5;
        let fixedSum = Number(sum);
        let floatingSum = Number(sum);
        let year = 0;
        console.log(sum);
        console.log(desiredSum);
        while (fixedSum <= desiredSum || floatingSum <= desiredSum) {
            year++;
            fixedSum += sum * (fixedPercent / 100);
            if (year === 1) {
                floatingSum += sum * (floatingPercent / 100);
            } else {
                floatingPercent = 4.5;
                floatingSum += sum * (floatingPercent / 100);
            }
            console.log('Fixed sum');
            console.log(fixedSum);
            console.log('Floating sum');
            console.log(floatingSum);
        }
        if (fixedSum > floatingSum)  {
            alert('Fixed');
        } else {
            alert('Floating');
        }
    }

    return (
        <div className={classes.project}>
        <form className={classes.test}>
            <div>
                Get recommendation
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
                <label className={classes.singUpLabel}>Desired Sum</label>
                <input 
                    type="text" 
                    value={desiredSum}
                    onChange={(e) => setDesiredSum(e.target.value)}
                    className={classes.signUpInput}
                    required>
                </input>
            </div>
            <button type="submit" className={classes.signUpButton} onClick={getRecomendation}>
                <div className={classes.signUpButtonText}>
                    Create aim
                </div>
            </button>
        </form>
    </div>
    )
})

export default Aim
