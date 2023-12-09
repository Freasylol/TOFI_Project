const db = require('../models/index');
const uuid = require('uuid');
const path = require('path');
const { resourceLimits } = require('worker_threads');
 
class DeviceController {
    async create(req, res) { 
        let {name, price, BrandId, TypeId, info} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName));

        price = Number(price)
        BrandId = Number(BrandId)
        TypeId = Number(TypeId)

        const device = await db.Device.create(
            {name: name,
             price: price,
             BrandId: BrandId,
             TypeId: TypeId,
             img: fileName
            }).then(function(user) {
                // you can now access the newly created task via the variable task
                console.log('success');
            }).catch(function(err) {
                // print the error details
                console.log('Error details')
                console.log(err, req.body);
            });

        return res.json(device);
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;

        let devices;

        console.log(req.query)

        if (!brandId && !typeId) {
            devices = await db.Device.findAll();
        } else if (brandId && !typeId) {
            devices = await db.Device.findAll({where: {brandId}});
        } else if (!brandId && typeId) {
            devices = await db.Device.findAll({where: {typeId}});
        } else {
            devices = await db.Device.findAll({where: {brandId, typeId}});
        }
       
        return res.json(devices);
    }
}

module.exports = new DeviceController()