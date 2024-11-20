const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection

    const Type_payment = con.define('tb_type_payments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type:{
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        }
    })


    // Type_payment.sync({alter: true})
    return Type_payment
}