const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Warehouse = con.define('tb_warehouse', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            default: 0
        },
    })

    // Warehouse.sync({alter: true})
    return Warehouse
}