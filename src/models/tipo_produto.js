const { Sequelize } = require("sequelize")

module.exports = app =>{

    const con = app.src.database.connection

    const Type = con.define('tb_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    })

    // Type.sync({alter:true})
    return Type
}