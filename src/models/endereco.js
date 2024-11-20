const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Address = con.define('tb_address', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        neighborhood: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        street:{
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        house:{
            type: Sequelize.STRING(20),
            allowNull: true,
        },
    })


    // Address.sync({alter: true})

    return Address
}