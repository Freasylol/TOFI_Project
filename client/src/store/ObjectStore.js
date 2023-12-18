import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._deposits = [
            {id: 1, sum: 100, date: '2023-12-11', term: '2024-12-11', percent: 4, minSum: 100},
        ]
        this._depositTypes = [
            {id: 1, minSum: 100 , percent: 4}
        ]
        this._creditTypes = [
            {id: 1, minSum: 100, minTerm: 3, percent: 9, name: 'Annuity'},
            {id: 2, minSum: 100, minTerm: 3, percent: 9, name: 'Differential'}
        ];
        this._credits = [
           
        ]
        this._aims = [
            {id: 1, startSum: 100, finishSum: 400, date: '2023-12-11', bankAccountId: 1, depositId: 1}
        ]
        this._bankAccounts = [
        ]
        this._transactions = [
        ];
        makeAutoObservable(this)
    }

    setDeposits(deposits) {
        this._deposits = deposits
    }
    
    setCredits(credits) {
        this._credits = credits;
    }

    setAims(aims) {
        this._aims = aims
    }

    setBankAccounts(bankAccounts) {
        this._bankAccounts = bankAccounts;
    }

    setTransactions(transactions) {
        this._transactions = transactions;
    }

    get deposits() {
        return this._deposits
    }

    get credits() {
        return this._credits
    }

    get aims() {
        return this._aims
    }

    get bankAccounts() {
        return this._bankAccounts;
    }

    get transactions() {
        return this._transactions;
    }
}