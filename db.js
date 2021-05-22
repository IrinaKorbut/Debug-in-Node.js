const Sequelize = require("sequelize");
                                    //database  username    password
const sequelize = new Sequelize('gamedb', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    logging: false
});

sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(`Error: ${error}`));


module.exports = sequelize;