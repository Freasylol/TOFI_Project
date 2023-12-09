const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const SECRET_KEY = 'sEcRet key';

const generateJwt = (id, email, userRole) => {
  return jwt.sign(
    {id, email, userRole}, 
    SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class UserController {
    async registration(req, res) {
        const {name, lastName, email, password, userRole} = req.body;
        const user = await db.Users.create({name, lastName, email, userRole, password: password});
        const basket = await db.Basket.create({id: user.id})
        const token = generateJwt(user.id, email, password);

        res.json({token});
    }

    async login(req, res, next) {
      const {email, password} = req.body;
      console.log(email);
      console.log(password);
      const user = await db.Users.findOne({where: {email}})

      if (!user) {
        res.send('Такого пользователя не существует');
        return;
      }
    
    
      // let comparePassword = bcrypt.compareSync(password, user.password);

      // if (!comparePassword) {
      //   res.send('Указан неверный пароль');
      // }

      const token = generateJwt(user.id, user.email, user.userRole);

      return res.send({token});
    }

    async getAll(req, res) {
        return await db.Users.findAll().then(users => res.json(users));
    }

    async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.userRole);

      return res.json({token});
    }

    async delete(req, res) {
      db.Users.destroy({
        where: {
          id: req.body.id
        }
      })
    }

    async update(req, res) {
      db.Users.update(
        {
          name: "updateName"
        },
        {
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new UserController()