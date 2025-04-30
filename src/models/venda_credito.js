const { Sequelize } = require("sequelize")

module.exports = app =>{
    const con = app.src.database.connection
    const Credit = app.src.models.credito
    const Product = app.src.models.produtos

    const Sales_credit = con.define('tb_sales_credits',{
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
        fk_credit: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fk_product: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Sales_credit.belongsTo(Credit, {foreignKey: 'fk_credit'})
    Sales_credit.belongsTo(Product, {foreignKey: 'fk_product'})

    // Sales_credit.sync({alter: true})
    return Sales_credit
}