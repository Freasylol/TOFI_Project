const db = require('../models/index')

class TypeController {

    async create(req, res) {
        let type;

        type = await db.Type.create({
            name: req.body.name,
        }); 
        
        return res.json(type);
    }

    async getAll(req, res) {
        return await db.Type.findAll().then(type => res.json(type));
    }
}


module.exports = new TypeController()