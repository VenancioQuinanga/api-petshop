const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Type_payment = app.src.models.tipo_pagamento
    const Users = app.src.models.usuario
    const Client = app.src.models.cliente

    const Sale = con.define('tb_sales', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fk_client: {
            type: Sequelize.INTEGER,
            allowNull: false
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

    Sale.belongsTo(Type_payment, {foreignKey: 'fk_payment_type'})
    Sale.belongsTo(Users, {foreignKey: 'fk_user'})
    Sale.belongsTo(Client, {foreignKey: 'fk_client'})
    
    // Sale.sync({alter:true})
    return Sale
}