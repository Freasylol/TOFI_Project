const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'tofi_project_db',
    'postgres',
    '6238',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT
    }

)