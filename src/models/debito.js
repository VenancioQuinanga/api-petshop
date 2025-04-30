const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Type_payment = app.src.models.tipo_pagamento
    const Users = app.src.models.usuario
    const Client = app.src.models.cliente

    const Debit = con.define('tb_debits', {
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

    Debit.belongsTo(Type_payment, {foreignKey: 'fk_payment_type'})
    Debit.belongsTo(Users, {foreignKey: 'fk_user'})
    Debit.belongsTo(Client, {foreignKey: 'fk_client'})
    
    // Debit.sync({alter:true})
    return Debit
}