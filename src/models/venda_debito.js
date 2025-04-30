const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Debit = app.src.models.debito
    const Product = app.src.models.produtos

    const Sales_debit = con.define('tb_sales_debits',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_debit: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Sales_debit.belongsTo(Debit, {foreignKey: 'fk_debit'})
    Sales_debit.belongsTo(Product, {foreignKey: 'fk_product'})

    // Sales_debit.sync({alter: true})
    return Sales_debit
}