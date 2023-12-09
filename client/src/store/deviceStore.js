// import { type } from 'express/lib/response';
// import {makeAutoObservable} from 'mobx';

// export default class DeviceStore {
//   constructor() {
//     this._types = [
//       {id: 1, name: 'Процессоры'},
//       {id: 2, name: 'ПК'}
//     ]
//     this._brands = [
//       {id: 1, name: 'Samsung'},
//       {id: 2, name: 'Apple'}
//     ]
//     this._devices = [
//       {id: 1, name: 'ryzen 5 3600', price: 3500, rating: 5, img:'https://itmarket.by/pics/items/427159_2245_draft.jpg'},
//       {id: 2, name: 'ryzen 5 5600', price: 3500, rating: 5, img:'https://itmarket.by/pics/items/427159_2245_draft.jpg'}
//     ]
//     makeAutoObservable(this)
//   }

//   setTypes(types) {
//     this._types = types
//   }
  
//   setBrands(brands) {
//     this._brands = brands
//   }

//   setUser(user) {
//     this._user = user
//   }

//   get types() {
//     return this._types
//   }

//   get brands() {
//     return this._brands
//   }

//   get devices() {
//     return this._devices
//   }
// }