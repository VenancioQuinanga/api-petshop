const { Sequelize } = require("sequelize")

module.exports = app =>{

    const con = app.src.database.connection

    const Family = con.define('tb_family', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        family: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(30),
            allowNull: false

        }
    })

    // Family.sync({alter: true})
    return Family
}