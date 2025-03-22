const { Sequelize } = require("sequelize")

module.exports = app =>{

    const con = app.src.database.connection

    const acert_type = con.define('tb_acert_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    })

    // acert_type.sync({alter:true})
    return acert_type
}