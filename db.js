const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    {
        database: 'tofi_project_db',
        username: 'admin',
        password: 'KqE9p4Kf5eoPq0uPhg3H0psr0boxBHwv',
        dialect: 'postgres',
        host: 'dpg-clu5a621hbls73ea14fg-a.frankfurt-postgres.render.com', 
        port: process.env.DB_PORT,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            keepAlive: true,
        },
        ssl:true,
        
    })

// module.exports = new Sequelize('`postgres://admin:KqE9p4Kf5eoPq0uPhg3H0psr0boxBHwv@dpg-clu5a621hbls73ea14fg-a.frankfurt-postgres.render.com/tofi_project_db',
//     {
//         dialect: 'postgres',
//         protocol: 'postgres',
//         port: 5432
//     }

// )

// module.exports = new Sequelize(
//     `postgres://admin:KqE9p4Kf5eoPq0uPhg3H0psr0boxBHwv@dpg-clu5a621hbls73ea14fg-a.frankfurt-postgres.render.com/tofi_project_db`,
//     { loggin: false, native: false}
// )