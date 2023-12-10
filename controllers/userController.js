const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const generateJwt = (id, email, roleId) => {
    return jwt.sign(
        {id, email, roleId},
        'secretKey',
        {expiresIn: '24h'}
    )
}

class UserController {
    async getAll(req, res) {
        return await User.findAll().then(type => res.json(type));
    }

    async createOne(req, res, next) {
        const {first_name, last_name, email, password, passport_id, birth_date, roleId} = req.body;
        const newUser = await User.findOne({where: {email}});
        if (newUser) {
            return next(ApiError.badRequest('User with that email already exists'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({first_name, last_name, email, password: hashPassword, passport_id, birth_date, roleId});
        const token = generateJwt(user.id, user.email, user.roleId);
        // return res.json(user);
        return res.json(token);
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.roleId)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('User with email does not exist'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Specified incorrect password'));
        }
        const token = generateJwt(user.id, user.email, user.roleId);
        return res.json(token);
    }

    async getOne(req, res) {
        const id = Number(req.params.id);
        const user = await User.findOne({where: {id: id}});
        return res.json(user);
    }

    async updateOne(req, res) {
        const id = Number(req.params.id);
        const {first_name, last_name, email, password, passport_id, birth_date, roleId} = req.body;
        const user = await User.update({first_name, last_name, email, password, passport_id, birth_date, roleId}, {where: {id: id}});
        return res.json(user);
    }

    async deleteOne(req, res) {
        User.destroy({
          where: {
            id: req.body.id
          }
        })
    }
}

module.exports = new UserController();