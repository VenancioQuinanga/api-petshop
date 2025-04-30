const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Type_payment = app.src.models.tipo_pagamento
    const Users = app.src.models.usuario
    const Client = app.src.models.cliente

    const Credit = con.define('tb_credits', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fk_client: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        fk_payment_type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        payment: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        troco: {
            type: Sequelize.DECIMAL(10,2)
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    })

    Credit.belongsTo(Type_payment, {foreignKey: 'fk_payment_type'})
    Credit.belongsTo(Users, {foreignKey: 'fk_user'})
    Credit.belongsTo(Client, {foreignKey: 'fk_client'})
    
    // Credit.sync({alter:true})
    return Credit
}