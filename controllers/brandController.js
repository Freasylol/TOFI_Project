const db = require('../models/index');

class BrandController {
    async create(req, res) {
        let brand;

        brand = await db.Brand.create({
            name: req.body.name,
        }).then(function(user) {
            // you can now access the newly created task via the variable task
            console.log('success');
        }).catch(function(err) {
            // print the error details
            console.log('Error details')
            console.log(err, req.body);
        });
        
        return res.json(brand);
    }

    async getAll(req, res) {
        return await db.Brand.findAll().then(type => res.json(type));
    }
}


module.exports = new BrandController()