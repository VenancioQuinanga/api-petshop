const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Telephone = con.define('tb_telephone', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        telephone: {
            type: Sequelize.INTEGER(15),
            allowNull: true
        },
    })

    // Telephone.sync({alter: true})
    
    return Telephone
}